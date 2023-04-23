import { Schema, Document } from 'mongoose';


export interface IOrderModel extends Document {

  products: Array<{product: Object, count: number}>;
  
  user: {
    //name: String,
    userId: Schema.Types.ObjectId,
  }

  date: Date;

  price: Number;
 
}