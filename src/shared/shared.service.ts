import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from 'src/module/shop/entities/shop.schema';
import { IProfile } from './model/profile.model';

@Injectable()
export class SharedService {
	constructor(
		@InjectModel(Shop.name) private shopModel: Model<ShopDocument>
	) {}

	async isOwner(shopId: string, profile: IProfile) {
		const foundShop = await this.shopModel.findOne({
			_id: shopId,
			owner: profile.email,
			deleted: false
		});

		if (!foundShop) {
			throw new ForbiddenException('no-permission-of-shop');
		} else {
			return foundShop;
		}
	}
}
