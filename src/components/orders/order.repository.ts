import { injectable } from "inversify";
import { Schema } from "mongoose";
import "reflect-metadata";
import { IOrderRepository } from "./order.repository.interface";


@injectable()
export class OrderRepository implements IOrderRepository {

  async addToOrder (userId: Schema.Types.ObjectId){
    
  }
}