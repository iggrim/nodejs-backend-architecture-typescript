import { IOrderService } from "./order.service.interface";
import { Schema, Types, LeanDocument } from "mongoose";
import { TYPES } from "../../types";
//import {} from './order.repository'

//@injectable()
export class OrderService implements IOrderService {
  constructor(
    //@inject(TYPES.CartRepository) private cartRepository: CartRepository,
  ) 
 
  {}

  async createOrder(userId: Schema.Types.ObjectId) {

  }
}
