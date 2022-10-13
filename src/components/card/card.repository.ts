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
  toJson({title, price, img, id}: CardDto){
    return {
      title, price, img, id
    }
	}

  async add(product: CardDto):Promise<void> {
    const card = await this.fetchItems();
    const item = this.toJson(product); // срабатывают геттеры в CardItem
    
    //console.log('--produc пришло ',product);
    //console.log('--card имеется', card);
    const idx = card.products.findIndex((c: CardDto) => c.id === item.id)
    const candidate = card.products[idx]

    if (candidate) {
      // курс уже есть

      candidate.count++

      card.products[idx] = candidate // зачем повторно записывать (один и тот же индекс)
    } else {
      // нужно добавить курс    
      const productCard = {...item, count:1}    
      //product.count = 1
      card.products.push(productCard)
    }

    card.price += +product.price

    return new Promise((resolve, reject) => {

      fs.writeFile(path.join(__dirname, '../../', 'data', 'card.json'), JSON.stringify(card), err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })

  } 

  async fetchItems() : Promise<{products: {img: string, price: number, title: string, id: string, count: number}[], price: number}> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../../', 'data', 'card.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      )
    })
  }

  async remove(id: string): Promise<{products: {img: string, price: number, title: string, id: string, count: number}[], price: number}>{
    const card = await this.fetchItems();

    const idx = card.products.findIndex(c => c.id === id)
    //console.log('--idx ', idx);
    const product = card.products[idx];
    if (product.count === 1) {
      // удалить
      card.products = card.products.filter(c => c.id !== id)
    } else {
      // изменить количество
      card.products[idx].count--
    }

    card.price -= product.price

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '../../', 'data', 'card.json'), JSON.stringify(card), err => {
        if (err) {
          reject(err)
        } else {
          resolve(card)
        }
      })
    })
  }
}