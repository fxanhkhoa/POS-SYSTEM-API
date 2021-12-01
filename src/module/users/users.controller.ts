import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Request,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@UseGuards(LocalAuthGuard)
	@Get('profile')
	@ApiBearerAuth()
	async getProfile(@Request() req) {
		const user = await this.userService.findByEmail(req.user.email);
		if (user) {
			delete user.roles;
			return user;
		} else {
			throw new HttpException(
				'Error getting profile',
				HttpStatus.FORBIDDEN
			);
		}
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-up')
	@ApiBearerAuth()
	async signUp(@Request() req, @Body() dto: CreateUserDto) {
		return await this.userService.signUp(dto, req.user);
	}
}
