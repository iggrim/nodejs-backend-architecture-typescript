import { Schema, Types } from 'mongoose';
import { ICart } from "./cart.model.interface";

export interface ICartService {
  createCartItem: (userId: Schema.Types.ObjectId, productId: string) => Promise<void>;
  getReordById: (userId: Schema.Types.ObjectId) => Promise<(ICart & {_id: Types.ObjectId;}) | null> 

}
