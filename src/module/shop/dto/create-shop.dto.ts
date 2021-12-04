import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShopDto {
	@ApiProperty({ default: 'Shop Hello Kitty' })
	@IsNotEmpty()
	shopName: string;

	@ApiProperty({ default: '07712345' })
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ default: 'Cat toy shop' })
	description: string;

	@ApiProperty({ default: 'https://aaa.com/xxx.png' })
	avatar: string;

	@ApiProperty({ default: 'https://aaa.com/xxx.png' })
	cover: string;
}
