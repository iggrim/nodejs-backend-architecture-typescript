import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { ProductDto } from "../products/product.dto";
import { CartDto } from "./cart.dto";
import { CartItem } from "./cart.entity";
import { ICartRepository } from "./cart.repository.interface";
import "reflect-metadata";

@injectable()
export class CartRepository implements ICartRepository {
  // срабатывают геттеры в CartItem
  //toJson({title, price, img, id}: CartDto){
  toJson({ title, price, img }: CartDto) {
    return {
      title,
      price,
      img,
    };
  }

  async add(product: CartDto): Promise<void> {}

  //async remove(id: string): Promise<{products: {img: string, price: number, title: string, id: string, count: number}[], price: number}>{
  async remove(id: string) {}
}
