import {Schema, model} from 'mongoose';
import { ICart } from './cart.model.interface';
import { Product } from '../products/product.entity'


const cartSchema = new Schema<ICart>({
  userId: { 
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
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
      }
    },
  ]
  
})

// будем придерживаться общей схемы построения архитектуры приложения
// к БД  будем обращаться через cart.repository.ts, 

// Модели создаются из схем методом mongoose.model():
// третий параметр - явное имя коллекции
export const CartModel = model<ICart>('Cart', cartSchema, 'Cart'); // 'User' - название модели