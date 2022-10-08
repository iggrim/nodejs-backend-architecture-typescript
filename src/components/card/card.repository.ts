import { injectable } from 'inversify';
import fs from 'fs';
import path from 'path';
import { Product } from '../products/product.entity';
import { ICardRepository } from './card.repository.interface'
import 'reflect-metadata';


@injectable()
export class CardRepository implements ICardRepository {
  async add(product: {img: string, price: number, title: string, id: string}):Promise<void> {
    const card = await this.fetchItems()
    //console.log('--product ',product);
    //console.log('--card ', card);
    const idx = card.products.findIndex((c:{img: string, price: number, title: string, id: string, count: number}) => c.id === product.id)
    const candidate = card.products[idx]

    if (candidate) {
      // курс уже есть

      candidate.count++

      card.products[idx] = candidate // зачем повторно записывать
    } else {
      // нужно добавить курс    
      const productCard = {...product, count:1}    
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
}