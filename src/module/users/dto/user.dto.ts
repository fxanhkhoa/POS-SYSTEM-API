import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty()
	@IsNotEmpty()
	phone: string;

	@ApiProperty()
	@IsNotEmpty()
	address: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
	'firstName',
	'lastName',
	'phone',
	'address'
]) {}
