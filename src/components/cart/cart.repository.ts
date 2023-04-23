import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { Cart } from "./cart.entity";
import { CartModel } from "./cart.model";
import { ICartRepository } from "./cart.repository.interface";
import { ICart } from "./cart.model.interface";
import { Schema, Types, LeanDocument } from "mongoose";
import { IProductModel } from "../products/products.model.inerface";
import "reflect-metadata";

@injectable()
export class CartRepository implements ICartRepository {
  // надо вынести логику в CartService-----------------!!!!!!!!!!!!
  async addToCart(cartUser: (ICart & { _id: Types.ObjectId})) {
    cartUser.save();
  }

  async deleteCart(userId: Schema.Types.ObjectId){
    await CartModel.deleteOne({ userId: userId });
  }

  async getById(
    userId: string
  ): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const cartUser = await CartModel.findById(userId);
    return cartUser;
  }

  async getRecord(
    userId: string
  ): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const cartUser = await CartModel.findOne({ userId: userId });
    return cartUser;
  }

  async getByIdObjectJs(
    userId: Schema.Types.ObjectId
  ): Promise<LeanDocument<ICart & { _id: Types.ObjectId }> | null> {
    const cartUser = await CartModel.findOne({ userId: userId.toString() })
    .populate("userId") // несколько "популейтов" :)
    .populate({ path: "items", populate: { path: "productId" } })
      .lean();

    return cartUser;
  }

  async deleteFromCart(cartUser: ICart & { _id: Types.ObjectId}): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    
    return cartUser.save(); // сохраняем документ
  }
}
