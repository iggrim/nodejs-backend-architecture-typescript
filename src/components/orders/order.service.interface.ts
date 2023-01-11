import { Schema, Types, LeanDocument } from 'mongoose';


export interface IOrderService {
  //createOrder: (userId: Schema.Types.ObjectId) => Promise<void> ; 
  createOrder: (user: any) => Promise<void> ; 
}