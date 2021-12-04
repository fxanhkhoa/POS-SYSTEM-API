import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/module/users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Users)
		private usersRepository: Repository<Users>
	) {}

	async findByEmail(email: string) {
		return this.usersRepository.findOne({ email, deleted: false });
	}

	async validateUser(token: string) {
		return {
			email: 'aaa'
		};
	}
}
