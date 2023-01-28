import { IOrderService } from "./order.service.interface";
import { Schema, Types, LeanDocument, Document } from "mongoose";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";
import { OrderRepository } from "./order.repository";
import { CartRepository } from "../cart/cart.repository";
import { IOrderModel } from "./order.model.interface";


//import {} from './order.repository'

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: OrderRepository,
    @inject(TYPES.CartRepository) private cartRepository: CartRepository,

  ) {}

  async createOrder(userId: Schema.Types.ObjectId) {

    //const orderUser = await this.orderRepository.getRecord(userId.toString());
    
    // получаем JS объект с развернутыми полями через populate
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

    // напоминание - после создания ордера, корзина очищается
    await this.orderRepository.addToOrder(orderBlank);

    await this.cartRepository.deleteCart(userId);
  }

  async getRecords(userId: Schema.Types.ObjectId): Promise<(LeanDocument<IOrderModel & { _id: Types.ObjectId; }>[])> {

    const orders = await this.orderRepository.getRecords(userId.toString())
    return orders;
  }
}
