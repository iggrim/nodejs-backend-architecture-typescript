
import { Product } from './product.entity';

export interface IProductsRepository {
	save: (product: Product) => Promise<void>;
	getAll: () => Promise<Product>;
}
