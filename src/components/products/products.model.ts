import {Schema, Types, model,  } from 'mongoose';
import { IProductModel } from './products.model.inerface'


const ProductSchema: Schema = new Schema<IProductModel>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  img: {type: String},

  // ссылка на id  пользователя создавшего товар
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  }
  // ref: 'User'  - данная строка должна совпадать с названием модели User
})


export const ProductModel = model<IProductModel>('Product', ProductSchema);

