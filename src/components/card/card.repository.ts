import { injectable } from 'inversify';
import fs from 'fs';
import path from 'path';
import { ProductDto } from "../products/product.dto";
import { CardDto } from './card.dto';
import { CardItem } from './card.entity';
import { ICardRepository } from './card.repository.interface'
import 'reflect-metadata';


@injectable()
export class CardRepository implements ICardRepository {

  // срабатывают геттеры в CardItem
  //toJson({title, price, img, id}: CardDto){
  toJson({title, price, img}: CardDto){
    return {
      title, price, img,
    }
	}

  async add(product: CardDto):Promise<void> {
    

  } 

  

  //async remove(id: string): Promise<{products: {img: string, price: number, title: string, id: string, count: number}[], price: number}>{
  async remove(id: string){
    
  }
}