import { Schema, Types, LeanDocument, Document } from 'mongoose';
import { IUser } from '../users/user.model.interface';


export interface IOrderService {
  createOrder: (userId: Schema.Types.ObjectId) => Promise<void> ; 
  //createOrder: (user: Document<unknown, any, IUser> & IUser & { _id: Types.ObjectId }) => Promise<void> ; 
}