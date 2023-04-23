import { IOrderService } from "./order.service.interface";
import { Schema, Types, LeanDocument } from "mongoose";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";
import { OrderRepository } from "./order.repository";
import { CartRepository } from "../cart/cart.repository";
import { IOrderModel } from "./order.model.interface";


@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.OrderRepository) private orderRepository: OrderRepository,
    @inject(TYPES.CartRepository) private cartRepository: CartRepository,

  ) {}

  async createOrder(userId: Schema.Types.ObjectId) {
   
    // получаем JS объект с развернутыми полями через populate
    const cartUser = await this.cartRepository.getByIdObjectJs(userId);
 
    // console.log('--- OrderService cartUser.items ', cartUser?.items);

    // создаем массив объектов(товаров)
    const products = cartUser?.items.map(i => ({ 
      count: i.count,
      product: {...i.productId},
      //product: i.productId,       
    }))
   
    const itemsObjArrJs = JSON.parse(JSON.stringify(cartUser?.items))

    const price: number =itemsObjArrJs.reduce((a: number, c: any) => a + Number(c.productId.price*c.count), 0 )
    console.log('---itemsObjArrJs price', price )

    const orderBlank = {
      user: {userId: cartUser?.userId},
      products: products,  
      price: price,      
    }

    //price: itemsObjArrJs[k].reduce((acc: number, cur: any)=>{cur.productId.price}, 0 )
    //console.log('---user ', user);

    // напоминание - после создания ордера, корзина очищается
    await this.orderRepository.addToOrder(orderBlank);

    // Временно закомментировал
    await this.cartRepository.deleteCart(userId);
  }

  async getRecords(userId: Schema.Types.ObjectId): Promise<(LeanDocument<IOrderModel & { _id: Types.ObjectId; }>[])> {

    const orders = await this.orderRepository.getRecords(userId.toString())
    const orderUserObjJs = orders.map((c)=> c.products)

    return orders;
  }
}
