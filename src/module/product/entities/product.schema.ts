import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	barcode: string;

	@Prop()
	images: string[];

	@Prop({ required: true })
	unitPrice: number;

	@Prop()
	packPrice: number;

	@Prop()
	promotion: number;

	@Prop()
	quantity: number;

	@Prop()
	location: string;

	@Prop({ required: true })
	ownedShop: string;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;

	@Prop()
	createdBy: string;

	@Prop()
	updatedBy: string;

	@Prop({ required: true })
	deleted: boolean;

	@Prop()
	deletedAt: Date;

	@Prop()
	deletedBy: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
