import { Schema, model } from 'mongoose';
import { IOrderModel } from './order.model.interface'

const orderSchema = new Schema<IOrderModel>({
  products: [
    {
      product: {
        type: Object,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      
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
  },

  price:{
    type: Number,
    required: true
  }

})

export const OrderModel = model<IOrderModel>('Order', orderSchema)