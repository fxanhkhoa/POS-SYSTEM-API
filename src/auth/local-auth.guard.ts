import {
	ExecutionContext,
	HttpException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as firebaseAdmin from 'firebase-admin';
import { UsersService } from 'src/module/users/users.service';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	constructor(private usersService: UsersService) {
		super();
	}
	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		if (!request.headers.authorization) {
			throw new UnauthorizedException();
		}
		const token = request.headers.authorization.replace('Bearer ', '');
		try {
			const decodedToken = await firebaseAdmin
				.auth()
				.verifyIdToken(token);
			request.user = {
				uid: decodedToken.uid,
				email: decodedToken.email,
				picture: decodedToken.picture,
				googleName: decodedToken.name
			};
			const user = await this.usersService.findByEmail(
				decodedToken.email
			);
			if (user) {
				request.user = {
					...request.user,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
					deletedAt: user.deletedAt,
					roles: user.roles
				};
			}
			return true;
		} catch (error) {
			if (error?.errorInfo) {
				throw new UnauthorizedException(error.errorInfo.code);
			} else {
				throw new HttpException(error.response, error.status);
			}
		}
	}
}
