import { Schema, Types } from 'mongoose';
import { ICart } from "./cart.model.interface";

export interface ICartService {
  createCartItem: (userId: Schema.Types.ObjectId, productId: string) => Promise<void> ;
  getReordById: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null> ;
  getReord: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null> ;

}
