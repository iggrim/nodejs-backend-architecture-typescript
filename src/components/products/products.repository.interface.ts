
import { Product } from './product.entity';

export interface IProductsRepository {
	save: (product: Product) => Promise<void>;
	getAll: () => Promise<{img: string, price: number, title: string, id: string}[]>;
	getById: (id: string) => Promise<{img: string, price: number, title: string, id: string} | undefined>;
}
