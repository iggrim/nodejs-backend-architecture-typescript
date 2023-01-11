import { injectable } from "inversify";
import { Schema, Types, LeanDocument, ObjectId } from 'mongoose';
import "reflect-metadata";
import { IOrderRepository } from "./order.repository.interface";
import { OrderModel } from './order.model';
import { IOrderModel } from "./order.model.interface";


@injectable()
export class OrderRepository implements IOrderRepository {

  async addToOrder (userId: Schema.Types.ObjectId){
    
  }

  async getRecord(userId: string): Promise<(IOrderModel & {_id: Types.ObjectId;}) | null> {
    const orderUser = await OrderModel.findOne({"user.userId": userId});   
    return orderUser;  
  }
}