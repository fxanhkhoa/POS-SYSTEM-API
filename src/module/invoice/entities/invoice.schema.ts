import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IProductInvoice } from '../../../shared/model/product.model';
import {
	DeliveryMethod,
	InvoiceStatus
} from '../../../shared/enum/invoice-status.enum';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
	@Prop()
	name: string;

	@Prop(
		raw([
			{
				_id: false,
				barcode: { type: String },
				name: { type: String },
				unitPrice: { type: Number },
				quantity: { type: Number }
			}
		])
	)
	listProduct: IProductInvoice;

	@Prop({ required: true })
	temporaryTotal: number;

	@Prop()
	promotion: number;

	@Prop()
	total: number;

	@Prop()
	note: string;

	@Prop()
	paid: number;

	// change = paid - total
	@Prop()
	change: number;

	@Prop()
	saler: string;

	@Prop()
	status: InvoiceStatus;

	@Prop({ required: true })
	deliveryMethod: DeliveryMethod;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;

	@Prop()
	createdBy: string;

	@Prop()
	updatedBy: string;

	@Prop()
	deleted: boolean;

	@Prop()
	deletedAt: Date;

	@Prop()
	deletedBy: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
