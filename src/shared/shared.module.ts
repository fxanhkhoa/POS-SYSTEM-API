import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/module/shop/entities/shop.schema';
import { SharedService } from './shared.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Shop.name,
				schema: ShopSchema
			}
		])
	],
	providers: [SharedService],
	exports: [SharedService]
})
export class SharedModule {}
