import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import fs from 'fs';
import path from 'path';
import { Product } from './product.entity';
import { ProductDto } from './product.dto';
import { IProductsRepository } from './products.repository.interface';
import { ProductModel } from './products.model';
import { IProductModel } from './products.model.inerface'
//import { IProduct } from './products.inerface';
import 'reflect-metadata';

@injectable()
export class ProductsRepository implements IProductsRepository {
	// product: Product;


  // деструктуризация объекта
	// toJson({title, price, img, id}:Product){
  //   return {
  //     title, price, img, id
  //   }
	// }

  async update(product:  ProductDto): Promise<void> {
    // const products = await this.getAll();

    // const idx = products.findIndex(c => c.id === product.id);
    // products[idx] = product;

    // return new Promise((resolve, reject) => {
    //   fs.writeFile(
    //     path.join(__dirname, '../../', 'data', 'products.json'),
    //     JSON.stringify(products),
    //     (err) => {
    //       if (err) {
    //         reject(err)
    //       } else {
    //         resolve()
    //       }       
    //     }      
    //   )    
    // }) 
  }

	//async save(product: Product): Promise<void> {
	async save({title, price, img}: Product): Promise<void> {
    
    const createProduct = new ProductModel({title, price, img});
    try {
      createProduct.save();
    } catch (e) {
      console.log('Ошибка при сохранении ',e);
    }
		
	}

	async getAll() : Promise<(IProductModel)[]>{

    const products = await ProductModel.find();
    return products;
	
  }

  async getById(id: string): Promise<ProductDto | undefined> {

    // const products = await this.getAll();
    // //console.log('-products ', products)
    // //console.log('-id -', id)
    // const findProduct = products.find(p => p.id === id);
    // return findProduct;
     return
  }

}

	

