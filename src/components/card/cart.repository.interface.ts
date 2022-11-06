import { ProductDto } from "../products/product.dto";

export interface ICartRepository {
  add: (product: ProductDto) => Promise<void>;
}
