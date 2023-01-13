import { IOrderService } from "./order.service.interface";
import { Schema, Types, LeanDocument, Document } from "mongoose";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";
import { OrderRepository } from "./order.repository";
import { CartRepository } from "../cart/cart.repository";


//import {} from './order.repository'

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: OrderRepository,
    @inject(TYPES.CartRepository) private cartRepository: CartRepository,

  ) {}

  async createOrder(userId: Schema.Types.ObjectId) {

    const orderUser = await this.orderRepository.getRecord(userId.toString());
    
    if( !orderUser) {
      const cartUser = await this.cartRepository.getByIdObjectJs(userId);
          
      //console.log('---cartUser ', cartUser);
      // создаем массив объектов(товаров)
      const products = cartUser?.items.map(i => ({ 
        count: i.count,
        product: {...i.productId},
      }))
      
      // const user = JSON.parse(JSON.stringify(cartUser?.userId));

      const orderBlank = {
        user: {userId: cartUser?.userId},
        products: products,        
      }

      //console.log('---user ', user);

      await this.orderRepository.addToOrder(orderBlank)
    } else {

    }
  }
}
