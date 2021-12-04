import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './entities/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from '../shop/entities/shop.schema';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Product.name,
				schema: ProductSchema
			},
			{
				name: Shop.name,
				schema: ShopSchema
			}
		]),
		SharedModule
	],
	controllers: [ProductController],
	providers: [ProductService]
})
export class ProductModule {}
