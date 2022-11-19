import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { Cart } from "./cart.entity";
import { CartModel } from './cart.model';
import { ICartRepository } from "./cart.repository.interface";
import "reflect-metadata";

@injectable()
export class CartRepository implements ICartRepository {
 

  async addToCart(item: Cart): Promise<void> {
    
    //const createCart =  new CartModel(item.usreId, item.items);
    const createCart =  new CartModel({userId: item.usreId, items: item.items});
    //console.log('--createCart ', createCart);
    try {
      createCart.save(); // методы объекта модели
    } catch (e) {
      console.log('Ошибка при сохранении ',e);
    }	

  }

  //async remove(id: string): Promise<{products: {img: string, price: number, title: string, id: string, count: number}[], price: number}>{
  //async remove(id: string) {}
}
