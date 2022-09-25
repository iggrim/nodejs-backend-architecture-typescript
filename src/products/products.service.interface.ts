import { Product } from './product.entity';

export interface IProductsService {
  createProduct: (product: Product) => Promise<Product>,
}