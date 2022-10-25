import { model, Schema, Model, Document } from 'mongoose';
import { IProductModel } from './products.model.inerface'


const ProductSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: String,
    
})

// const User: Model<IUser> = model('User', UserSchema);
//export const ProductModel = model<IProductModel & Document>('Product', ProductSchema);
export const ProductModel = model<IProductModel>('Product', ProductSchema);
