import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private roles: string[] = []) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		if (!this.roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		return this.matchRoles(this.roles, user.role);
	}

	matchRoles(roles: string[], userRoles: string[]) {
		let result = false;
		userRoles.forEach((element) => {
			if (roles.includes(element)) {
				result = true;
				return;
			}
		});
		return result;
	}
}
