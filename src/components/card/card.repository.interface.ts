import { ProductDto } from "../products/product.dto";


export interface ICardRepository { 
  add: (product: ProductDto) => Promise<void>;
  
  fetchItems: () => Promise<{
    products: {img: string, price: number, title: string, id: string, count: number}[];
    price: number;
  }>;

  remove: (id: string) => Promise<{
    products: {img: string, price: number, title: string, id: string, count: number}[];
    price: number;
  }>;
}
