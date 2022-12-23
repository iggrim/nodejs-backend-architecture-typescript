import { Schema, model } from 'mongoose';
import { IOrder } from './order.model.interface'

const orderSchema = new Schema<IOrder>({
  products: [
    {
      product: {
        type: Object,
        required: true
      },
      count: {
        type: Number,
        required: true
      }
    }
  ],
  user: {
    //name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export const ModelSchema = model<IOrder>('Order', orderSchema)