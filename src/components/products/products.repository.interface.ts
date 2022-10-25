
import { Product } from './product.entity';
import {IProductModel} from '../models/products.model.inerface'

export interface IProductsRepository {
	save: (product: Product) => Promise<void>;
	//getAll: () => Promise<{img: string, price: number, title: string, id: string}[]>;
	getAll: () => Promise<IProductModel[]>;

	//getById: (id: string) => Promise<{img: string, price: number, title: string, id: string} | undefined>;
	getById: (id: string) => Promise<{img: string, price: number, title: string,} | undefined>;
}
