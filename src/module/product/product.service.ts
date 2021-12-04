import {
	ConflictException,
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfile } from 'src/shared/model/profile.model';
import { SharedService } from 'src/shared/shared.service';
import { Shop, ShopDocument } from '../shop/entities/shop.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.schema';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
		@InjectModel(Shop.name) private shopModel: Model<ShopDocument>,
		private sharedService: SharedService
	) {}

	async create(createProductDto: CreateProductDto, profile: IProfile) {
		const foundShop = await this.sharedService.isOwner(
			createProductDto.ownedShop,
			profile
		);
		const foundProduct = await this.productModel.findOne({
			barcode: createProductDto.barcode,
			ownedShop: createProductDto.ownedShop,
			deleted: false
		});
		if (foundProduct) {
			throw new ConflictException('duplicated-product');
		}
		const product = await this.productModel.create({
			...createProductDto,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: profile.email,
			updatedBy: profile.email,
			deleted: false
		});

		if (!product) {
			throw new UnprocessableEntityException('error-create-product');
		}

		foundShop.products.push({
			barcode: product.barcode,
			name: product.name
		});

		const result = foundShop.save();

		if (!result) {
			await this.productModel.deleteOne({ _id: product._id });
			throw new InternalServerErrorException('internal-error');
		}

		return product;
	}

	async findAllInShop(
		shopId: string,
		page: number,
		limit: number,
		profile: IProfile
	) {
		await this.sharedService.isOwner(shopId, profile);
		return this.productModel
			.find({
				ownedShop: shopId,
				deleted: false
			})
			.skip(page * limit)
			.limit(limit);
	}

	async findOne(barcode: string, shopId: string, profile: IProfile) {
		await this.sharedService.isOwner(shopId, profile);
		return this.productModel.findOne({
			barcode,
			ownedShop: shopId,
			deleted: false
		});
	}

	async update(
		barcode: string,
		updateProductDto: UpdateProductDto,
		shopId: string,
		profile: IProfile
	) {
		const foundShop = await this.sharedService.isOwner(shopId, profile);
		const product = await this.productModel.findOneAndUpdate(
			{ barcode, ownedShop: shopId, deleted: false },
			{
				...updateProductDto,
				updatedAt: new Date(),
				updatedBy: profile.email
			},
			{ new: true }
		);
		if (!product) {
			throw new UnprocessableEntityException('error-update-product');
		}
		foundShop.products = foundShop.products.map((item) => {
			if (item.barcode === barcode) {
				item.name = product.name;
			}
			return item;
		});
		const result = await foundShop.save();
		if (!result) {
			await this.productModel.findOneAndUpdate(
				{ _id: product._id },
				{ name: updateProductDto.name }
			);
			throw new InternalServerErrorException('internal-error');
		}
		return product;
	}

	async remove(barcode: string, shopId: string, profile: IProfile) {
		const foundShop = await this.sharedService.isOwner(shopId, profile);
		const product = await this.productModel.findOneAndUpdate(
			{ barcode, ownedShop: shopId, deleted: false },
			{
				deleted: true,
				deletedAt: new Date(),
				deletedBy: profile.email
			},
			{ new: true }
		);
		if (!product) {
			throw new UnprocessableEntityException('error-update-product');
		}
		foundShop.products = foundShop.products.filter(
			(item) => item.barcode !== product.barcode
		);
		const result = await foundShop.save();
		if (!result) {
			await this.productModel.findOneAndUpdate(
				{ _id: product._id },
				{ deleted: false, deletedAt: null, deletedBy: null }
			);
			throw new InternalServerErrorException('internal-error');
		}
		return product;
	}
}
