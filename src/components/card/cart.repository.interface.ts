import { Cart } from "./cart.entity";
import { ICart } from "./cart.model.interface";
import { Schema, Types } from 'mongoose';

export interface ICartRepository {
  addToCart: (item: Cart) => Promise<void>;
  //remove: (id: string) => Promise<void>;
  getById: (userId: Schema.Types.ObjectId) => Promise<(ICart & {_id: Types.ObjectId;}) | null>
}
