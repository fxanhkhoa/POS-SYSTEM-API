import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfile } from 'src/shared/model/profile.model';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop, ShopDocument } from './entities/shop.schema';

@Injectable()
export class ShopService {
	constructor(
		@InjectModel(Shop.name) private shopModel: Model<ShopDocument>
	) {}

	async create(createShopDto: CreateShopDto, profile: IProfile) {
		return this.shopModel.create({
			...createShopDto,
			owner: profile.email,
			createdAt: new Date(),
			createdBy: profile.email,
			updatedAt: new Date(),
			updatedBy: profile.email,
			deleted: false
		});
	}

	findShopWithOwner(_id: string, owner: string) {
		return this.shopModel.findOne({
			_id,
			owner,
			deleted: false
		});
	}

	findAll(page: number, limit: number) {
		return this.shopModel
			.find({ deleted: false })
			.skip(limit * page)
			.limit(limit);
	}

	async findOne(_id: string) {
		return this.shopModel.findOne({ _id, deleted: false });
	}

	update(_id: string, updateShopDto: UpdateShopDto, profile?: IProfile) {
		return this.shopModel.findOneAndUpdate(
			{ _id, deleted: false, owner: profile.email },
			{
				...updateShopDto,
				updatedAt: new Date(),
				updatedBy: profile.email
			}
		);
	}

	remove(_id: string, profile?: IProfile) {
		return this.shopModel.findOneAndUpdate(
			{ _id, deleted: false, owner: profile.email },
			{
				deleted: true,
				deletedAt: new Date(),
				deletedBy: profile.email
			}
		);
	}
}
