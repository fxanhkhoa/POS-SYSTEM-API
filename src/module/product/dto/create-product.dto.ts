import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
	@ApiProperty({ default: 'Thức ăn cho mèo' })
	@IsNotEmpty()
	name: string;

	@ApiProperty({ default: '8909283784' })
	@IsNotEmpty()
	barcode: string;

	@ApiProperty({ type: [String], default: ['https://aaa.com/xxx.png'] })
	images: string[];

	@ApiProperty({ default: 20000 })
	unitPrice: number;

	@ApiProperty({ default: 100000 })
	packPrice: number;

	@ApiProperty({ default: 10000 })
	promotion: number;

	@ApiProperty({ default: 20 })
	quantity: number;

	@ApiProperty({ default: 'Kho số 1' })
	location: string;

	@ApiProperty({ default: '61a9d8a920f9e30c0a1547ab' })
	ownedShop: string;
}
