import { ProductDto } from "../products/product.dto";


export interface ICardRepository { 
  add: (product: ProductDto) => Promise<void>;
  
  
}
