import {Schema, model} from 'mongoose';
import { ICart } from './cart.model.interface';


const cartSchema = new Schema({
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ]
  }
})

// Модели создаются из схем методом mongoose.model():
export const UserModel = model<ICart>('Cart', cartSchema); // 'User' - название модели