import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { Cart } from "./cart.entity";
import { CartModel } from './cart.model';
import { ICartRepository } from "./cart.repository.interface";
import { ICart } from "./cart.model.interface";
import { Schema, Types, LeanDocument } from 'mongoose';
import {IProductModel} from '../products/products.model.inerface'
import "reflect-metadata";


@injectable()
export class CartRepository implements ICartRepository {
 
  // надо вынести логику в CartService-----------------!!!!!!!!!!!!
  async addToCart(userId: Schema.Types.ObjectId, productItem: LeanDocument<IProductModel & {
    _id: Types.ObjectId;}> | null): Promise<void> {
    
    const cartUser = await this.getRecord(userId.toString()); 

    if (!cartUser) { // если еще нет корзины
      const cartItem = new Cart(userId, 1, productItem?._id);
      const createCart =  new CartModel({userId: cartItem.usreId, items: cartItem.items});
      createCart.save() // сохраняем документ
    } else {
      const items = [...cartUser.items]; //  копия cartUser.items
      const idx = items.findIndex(
        (item) => item.productId.toString() === productItem?._id.toString()
      );

      if (idx >= 0) {
        items[idx].count = items[idx].count + 1;
      } else {
        items.push({
          count: 1,
          productId: productItem?._id,
        });
      }
      cartUser.items = items;
      cartUser.save(); // сохраняем документ
    }

  }

  async getById(userId: string): Promise<(ICart & {_id: Types.ObjectId;}) | null> {
    const cartUser = await CartModel.findById(userId);
    return cartUser;
  }

  async getRecord(userId: string): Promise<(ICart & {_id: Types.ObjectId;}) | null> {
    const cartUser = await CartModel.findOne({userId: userId});
    return cartUser;
  }

  
  async getByIdobjectJs(userId: Schema.Types.ObjectId): Promise<LeanDocument<ICart & { _id: Types.ObjectId;}> | null> {    
    const cartUser = await CartModel.findOne({userId: userId.toString()}).populate({path: 'items', populate:{path: 'productId'}}).lean();
   
    return cartUser;
  }

  async deleteFromCart(userId: Schema.Types.ObjectId, productId: string): Promise<(ICart & { _id: Types.ObjectId;}) | null >{   
    
   // const cartUser = await this.getRecord(userId.toString());
    const cartUser = await CartModel.findOne({userId: userId.toString()});
       
    if( !cartUser ) {
      return null;   
    } else {
      let items = [...cartUser.items]; //  копия cartUser.items
      const idx = items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      //console.log('---items ', items);
      //console.log('---productId ', productId); // undefined

      if (items[idx].count === 1) {
        items = items.filter((item) => item.productId.toString() !== productId.toString())
      } else {
        items[idx].count--
      }

      cartUser.items = items; // items- массив
      return cartUser.save(); // сохраняем документ 
    }

  }
}
