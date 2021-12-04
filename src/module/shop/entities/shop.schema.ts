import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBaseProduct } from 'src/shared/model/product.model';

export type ShopDocument = Shop & Document;

@Schema()
export class Shop {
	@Prop({
		required: true
	})
	shopName: string;

	@Prop({
		required: true
	})
	owner: string;

	@Prop({
		required: true
	})
	phone: string;

	@Prop()
	description: string;

	@Prop()
	avatar: string;

	@Prop()
	cover: string;

	@Prop()
	staffs: string[];

	@Prop()
	createdAt: Date;

	@Prop()
	createdBy: string;

	@Prop()
	updatedAt: Date;

	@Prop()
	updatedBy: string;

	@Prop()
	deletedAt: Date;

	@Prop()
	deletedBy: string;

	@Prop()
	deleted: boolean;

	@Prop(
		raw([
			{
				_id: false,
				barcode: { type: String },
				name: { type: String }
			}
		])
	)
	products: IBaseProduct[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
