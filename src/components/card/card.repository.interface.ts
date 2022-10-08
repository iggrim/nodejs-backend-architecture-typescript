import { Product } from "../products/product.entity";

export interface ICardRepository { 
  add: (product: {img: string, price: number, title: string, id: string}) => Promise<void>;
  
  fetchItems: () => Promise<{
    products: {img: string, price: number, title: string, id: string, count: number}[];
    price: number;
  }>;
}
