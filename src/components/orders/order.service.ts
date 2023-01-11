import { IOrderService } from "./order.service.interface";
import { Schema, Types, LeanDocument, Document } from "mongoose";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";
import { OrderRepository } from "./order.repository";
import { CartRepository } from "../cart/cart.repository";
import { IUser } from "../users/user.model.interface";



//import {} from './order.repository'

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: OrderRepository,
    @inject(TYPES.CartRepository) private cartRepository: CartRepository,

  ) {}

  async createOrder(userId: Schema.Types.ObjectId) {

    const orderUser = await this.orderRepository.getRecord(userId.toString());
    //const orderUser = await this.orderRepository.getRecord(user._id.toString());
    if( !orderUser) {
      //const cartUser = await this.cartRepository.getRecord(userId.toString());
      //const cartUser = await this.cartRepository.getRecord(user._id.toString());
      const cartUser = await this.cartRepository.getByIdObjectJs(userId);
      
      console.log('---cartUser ', cartUser);

      const products = cartUser?.items.map(i => ({ // создаем массив объектов(товаров)
        count: i.count,
        product: {...i.productId},
      }))
      //await this.orderRepository.addToOrder
    } else {

    }
  }
}
