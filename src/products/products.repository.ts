import fs from 'fs';
import path from 'path';
import { Product } from './product.entity';
import { IProductsRepository } from './products.repository.interface';


export class ProductsRepository implements IProductsRepository {
	product: Product;
	
	constructor(product: Product){
		this.product = product;
	}

	toJson(){

	}

	async save(): Promise<void> {
		const products = await this.getAll();
		console.log('-product ', this.product)
		console.log('--products ', products)

	}

	async getAll() : Promise<Product>{

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

}

	

