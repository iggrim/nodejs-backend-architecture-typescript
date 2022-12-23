import { Schema, Document } from 'mongoose';


export interface IOrder extends Document {

  products: Array<{product: Object, count: number}>;
  
  user: {
    //name: String,
    userId: Schema.Types.ObjectId,
  }

  date: Date;
 
}