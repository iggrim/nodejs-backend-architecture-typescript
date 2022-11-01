
import { Product } from './product.entity';
import {IProductModel} from './products.model.inerface'
import { ObjectId, LeanDocument, Query, Types } from 'mongoose';

export interface IProductsRepository {
	save: (product: Product) => Promise<void>;
	//getAll: () => Promise<{img: string, price: number, title: string, id: string}[]>;
	getAll: () => Promise<(LeanDocument<IProductModel & { _id: ObjectId; }>[])>;

	//getById: (id: string) => Promise<{img: string, price: number, title: string, id: string} | undefined>;
	getById: (id: string) => Promise<LeanDocument<IProductModel & { _id: ObjectId; }> | null >;
}
