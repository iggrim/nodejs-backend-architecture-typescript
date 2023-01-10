import { Order } from "./order.entity";

import {IProductModel} from '../products/products.model.inerface'
import { Schema, Types, LeanDocument } from 'mongoose';


export interface IOrderRepository {
  // addToOrder: (userId: Schema.Types.ObjectId, productItem: LeanDocument<IProductModel & {
  //   _id: Types.ObjectId;}> | null) => Promise<void>;
   addToOrder: (userId: Schema.Types.ObjectId) => Promise<void>;  

  //remove: (id: string) => Promise<void>;
  // getById: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null>;
  // getRecord: (userId: string) => Promise<(ICart & {_id: Types.ObjectId;}) | null>;
  
  // getByIdobjectJs: (userId: Schema.Types.ObjectId) => Promise<LeanDocument<ICart & { _id: Types.ObjectId;}> | null>
 

}
