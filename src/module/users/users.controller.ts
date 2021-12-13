import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Put,
	Request,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
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
			return {
				...user,
				...req.user
			};
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

	@UseGuards(LocalAuthGuard)
	@Put('')
	@ApiBearerAuth()
	async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
		return await this.userService.updateUser(dto, req.user);
	}
}
