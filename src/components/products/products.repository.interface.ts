
import { Product } from './product.entity';
import {IProductModel} from './products.model.inerface'
import { Types, LeanDocument, Query} from 'mongoose';

export interface IProductsRepository {
	save: (product: Product) => Promise<void>;
	//getAll: () => Promise<{img: string, price: number, title: string, id: string}[]>;
	getAll: () => Promise<(LeanDocument<IProductModel & { _id: Types.ObjectId; }>[])>;

	//getById: (id: string) => Promise<{img: string, price: number, title: string, id: string} | undefined>;
	getById: (id: string) => Promise<LeanDocument<IProductModel & { _id: Types.ObjectId; }> | null >;
}
