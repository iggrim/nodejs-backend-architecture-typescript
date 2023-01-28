import { Schema, Types, LeanDocument, Document } from 'mongoose';
//import { IUser } from '../users/user.model.interface';
import { IOrderModel } from "./order.model.interface";


export interface IOrderService {
  createOrder: (userId: Schema.Types.ObjectId) => Promise<void> ; 
  //createOrder: (user: Document<unknown, any, IUser> & IUser & { _id: Types.ObjectId }) => Promise<void> ; 

  //getRecords: (userId: Schema.Types.ObjectId) => Promise<(IOrderModel & {_id: Types.ObjectId })[]>
  getRecords: (userId: Schema.Types.ObjectId) => Promise<(LeanDocument<IOrderModel & { _id: Types.ObjectId; }>[])>;
}