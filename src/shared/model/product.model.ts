export interface IBaseProduct {
	barcode: string;
	name: string;
}

export interface IProductInvoice {
	barcode: string;
	name: string;
	unitPrice: number;
	quantity: number;
}

export interface IProduct extends IBaseProduct {
	url: string;
	unitPrice: number;
	packPrice: number;
	promotion: number;
	ownedShop: string;
	quantity: number;
	location: string;
	createdAt: Date;
	createdBy: string;
	updatedAt: Date;
	updatedBy: string;
	deleted: boolean;
	deletedAt: Date;
	deletedBy: string;
}
