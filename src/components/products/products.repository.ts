import { injectable } from 'inversify';
import fs from 'fs';
import path from 'path';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { IProductsRepository } from './products.repository.interface';
import 'reflect-metadata';

@injectable()
export class ProductsRepository implements IProductsRepository {
	// product: Product;
	
	// constructor(product: Product){
	// 	this.product = product;
	// }

  // деструктуризация объекта
	toJson({title, price, img, id}:Product){
    return {
      title, price, img, id
    }
	}

  async update(product:  ProductDto): Promise<void> {
    const products = await this.getAll();

    const idx = products.findIndex(c => c.id === product.id);
    products[idx] = product;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../../', 'data', 'products.json'),
        JSON.stringify(products),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }       
        }      
      )    
    }) 
  }

	async save(product: Product): Promise<void> {
		const products = await this.getAll();
    
    const item = this.toJson(product); // срабатывают геттеры в Product
		//console.log('-product ', item);
		//console.log('--products ', products);
    products.push( item );
    
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '../../', 'data', 'products.json'),
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

	async getAll() : Promise<(ProductDto)[]>{
    //console.log('__dirname: ', __dirname);
    
		return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../../', 'data', 'products.json'),
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

  async getById(id: string): Promise<ProductDto | undefined> {

    const products = await this.getAll();
    //console.log('-products ', products)
    //console.log('-id -', id)
    const findProduct = products.find(p => p.id === id);
    return findProduct;
     
  }

}

	

