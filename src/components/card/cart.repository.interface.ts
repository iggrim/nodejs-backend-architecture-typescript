import { Cart } from "./cart.entity";

export interface ICartRepository {
  addToCart: (item: Cart) => Promise<void>;
  //remove: (id: string) => Promise<void>;
}
