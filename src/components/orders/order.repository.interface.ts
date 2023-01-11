import { Order } from "./order.entity";
import { Schema, Types, LeanDocument, ObjectId } from 'mongoose';
import { IOrderModel } from "./order.model.interface";


export interface IOrderRepository {
  // addToOrder: (userId: Schema.Types.ObjectId, productItem: LeanDocument<IProductModel & {
  //   _id: Types.ObjectId;}> | null) => Promise<void>;
  addToOrder: (userId: Schema.Types.ObjectId) => Promise<void>;  
  getRecord: (userId: string) => Promise<(IOrderModel & {_id: Types.ObjectId;}) | null>;
  
  
  //remove: (id: string) => Promise<void>;
  // getById: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null>;
  // getByIdobjectJs: (userId: Schema.Types.ObjectId) => Promise<LeanDocument<ICart & { _id: Types.ObjectId;}> | null>
}
