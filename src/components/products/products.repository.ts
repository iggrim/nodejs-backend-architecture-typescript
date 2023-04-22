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
import { ObjectId, LeanDocument, Query, Types } from 'mongoose';
import 'reflect-metadata';

@injectable()
export class ProductsRepository implements IProductsRepository {

  async update(id: string, product:  ProductDto): Promise<void> {
    await ProductModel.findByIdAndUpdate(id, product)
  }

	
	async save(Product: Product): Promise<void> {  
	  //async save({title, price, img, userId}: Product): Promise<void> {  
    //const createProduct = new ProductModel({title, price, img, userId});
    console.log('-------Репозиторий save ', Product)
    
    //const createProduct = new ProductModel({title, price, img, userId}: Product);
 
    // объект без данных, в createProduct только { _id: new ObjectId("6442d3c19d42c2fa76f3ec07") }
    // const createProduct = new ProductModel(Product); // ---1---

    // так работает
    const createProduct = new ProductModel({title: Product.title, price: Product.price, img: Product.img, userId: Product.userId});

    try {
   
      // здесь возникала ошибка , нет данных в createProduct ---1---
      createProduct.save(); // save метод объекта модели 
    
    } catch (e) {
      console.log('Ошибка при сохранении ',e);
    }	
	}

	async getAll() : Promise<(LeanDocument<IProductModel & { _id: ObjectId; }>[])>{
    
    const products = await ProductModel.find().populate('userId', 'email name').lean(); // методы объекта модели
    //  Метод lean mongoose возвращает простые объекты JavaScript (POJO), а не документы Mongoose.
   
    //console.log('--products ', products);
    return products;
  }

  async getById(id: string): Promise<LeanDocument<IProductModel & { _id: ObjectId; }> | null > {
   
    // lean() - для передачи в шаблонизатор нужен простой JS объект
    const findProduct = await ProductModel.findById(id).lean().exec(); // методы объекта модели
    
    return findProduct;
  }

  async deleteById(id:string){
    await ProductModel.deleteOne({_id: id});
  }

}

	

