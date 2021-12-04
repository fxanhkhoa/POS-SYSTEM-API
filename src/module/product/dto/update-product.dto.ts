import { PickType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PickType(CreateProductDto, [
	'location',
	'name',
	'packPrice',
	'promotion',
	'quantity',
	'unitPrice',
	'images'
]) {}
