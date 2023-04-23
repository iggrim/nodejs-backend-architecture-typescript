import { injectable } from "inversify";
import { Schema, Types, LeanDocument, ObjectId } from 'mongoose';
import "reflect-metadata";
import { IOrderRepository } from "./order.repository.interface";
import { OrderModel } from './order.model';
import { IOrderModel } from "./order.model.interface";


@injectable()
export class OrderRepository implements IOrderRepository {

  //async addToOrder (userId: Schema.Types.ObjectId){
  async addToOrder (orderBlank: {}){
      const order = new OrderModel(orderBlank);
      await order.save(); 
      // новый ордер(отдельный объект) будет добавлен в БД согласно модели
  }

  async getRecords(userId: string): Promise<(LeanDocument<IOrderModel & { _id: Types.ObjectId; }>[])> {
    const ordersUser = await OrderModel.find({"user.userId": userId}).populate('user.userId').lean();   
    return ordersUser;  
  }
}