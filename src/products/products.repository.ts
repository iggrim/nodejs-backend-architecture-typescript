import { injectable } from 'inversify';
import fs from 'fs';
import path from 'path';
import { Product } from './product.entity';
import { IProductsRepository } from './products.repository.interface';
import 'reflect-metadata';

@injectable()
export class ProductsRepository implements IProductsRepository {
	// product: Product;
	
	// constructor(product: Product){
	// 	this.product = product;
	// }

	toJson({title, price, img, id}:Product){
    return {
      title, price, img, id
    }
	}

	async save(product: Product): Promise<void> {
		const products = await this.getAll();
    
    const item = this.toJson(product);
		//console.log('-product ', item);
		//console.log('--products ', products);
    products.push( item );
    
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'products.json'),
        JSON.stringify(products),

        (err) => {
          if (err) {
            //console.log('ошибка ', err);
            reject(err)
          } else {
            //console.log('Все ОК.')
            resolve()
          }
        }
      )
    })
	}

	async getAll() : Promise<({img: string, price: number, title: string, id: string})[]>{
    console.log('__dirname: ', __dirname);
    
		return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'products.json'),
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

  async getById(id: string): Promise<{img: string, price: number, title: string, id: string} | undefined> {

    const products = await this.getAll();
    console.log('-products ', products)
    console.log('-id ', id)

    return products.find(p => p.id === id);
     
  }

}

	

