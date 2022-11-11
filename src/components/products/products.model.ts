import { model, Schema } from 'mongoose';
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

  userId: { // сылка на id  пользователя создавшего товар
    type: Schema.Types.ObjectId,
    ref: 'User' // данная строка должна совпадать с названием модели User
  }
})


export const ProductModel = model<IProductModel>('Product', ProductSchema);
