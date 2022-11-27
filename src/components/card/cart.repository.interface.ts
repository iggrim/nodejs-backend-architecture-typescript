import { Cart } from "./cart.entity";
import { ICart } from "./cart.model.interface";
import { Schema, Types } from 'mongoose';

export interface ICartRepository {
  addToCart: (item: Cart) => Promise<void>;
  //remove: (id: string) => Promise<void>;
  getById: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null>
  getRecord: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null>
}
