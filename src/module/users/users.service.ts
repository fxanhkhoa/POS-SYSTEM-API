import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/shared/enum/role.enum';
import { IProfile } from 'src/shared/model/profile.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users)
		private usersRepository: Repository<Users>
	) {}

	async findByEmail(email: string) {
		return this.usersRepository.findOne({ email, deleted: false });
	}

	async signUp(dto: CreateUserDto, profile: IProfile) {
		const foundUser = this.usersRepository.findOne({
			email: profile.email,
			deleted: false
		});
		if (foundUser) {
			throw new ConflictException('duplicated-email');
		}
		const userDto: Users = {
			...dto,
			email: profile.email,
			uid: profile.uid,
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			updatedBy: profile.email,
			createdBy: profile.email,
			deletedBy: null,
			deleted: false,
			roles: `${Role.USER}`
		};
		return this.usersRepository.insert(userDto);
	}
}
