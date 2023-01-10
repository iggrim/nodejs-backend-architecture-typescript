import { Schema, Document } from 'mongoose';


export interface ICart extends Document {

  userId: Schema.Types.ObjectId,
  items: Array<{count: number, productId: Schema.Types.ObjectId}>

  //addToCart: (product: Product ) => Promise<void>;
}