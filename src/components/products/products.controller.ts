import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { BaseController } from '../common/base.controller';
import { IProductsController } from './products.controller.interface';
import { ProductsService } from './products.service';
import { ProductsRepository} from './products.repository';

import 'reflect-metadata';


@injectable()
export class ProductsController extends BaseController implements IProductsController {
  /**
  Напоминание.
  В конструкторе ключевое слово super() используется как функция, вызывающая 
  родительский конструктор. Её необходимо вызвать до первого обращения к ключевому 
  слову this в теле конструктора. Ключевое слово super также может быть использовано 
  для вызова функций родительского объекта.
   */
	constructor(
    @inject(TYPES.ProductsService) private productsService: ProductsService,
    @inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository,
    
  ) {
		super();
		this.bindRoutes([
			{ path: '/', method: 'get', func: this.home },     
			{ path: '/add-product', method: 'get', func: this.addGet },
			{ path: '/add-product', method: 'post', func: this.addPost },
			{ path: '/products', method: 'get', func: this.products },
      { path: '/products/:id', method: 'get', func: this.productInfo }, 
      { path: '/products/:id/edit', method: 'get', func: this.showEditProduct},
      { path: '/product/save-edit', method: 'post', func: this.editProductPost},
      
		])
	}


  home(req: Request, res: Response, next: NextFunction) {
    res.render('index', {
      title_1: 'Главная страница',
      isHome: true
    })  
  }

  addGet(req: Request, res: Response, next: NextFunction) {
    res.render('add-product', {
      title_1: 'Добавить товар',
      isAdd: true
    })
  }

  addPost(req: Request, res: Response, next: NextFunction) {
    //console.log('req.body ', req.body)
    
    //const productsService = new ProductsService()
    this.productsService.createProduct(req.body);
      
    res.redirect('/products')
  }

  async products(req: Request, res: Response, next: NextFunction) {
    //const products = await new ProductsRepository().getAll();
    const products = await this.productsRepository.getAll();
    //console.log('--products ', products);

    res.render('products', {
      title_1: 'Товары',
      isProducts: true,
      products
    })
  }

  async showEditProduct(req: Request, res: Response, next: NextFunction){
    if (!req.query.allow) {
      return res.redirect('/'); // для прерывания функции - return
    }

    const product = await this.productsRepository.getById(req.params.id);

    res.render('product-edit', {
      title_1: product ?`Редактировать ${product.title}` : "Товар не найден",
      product
    })
  }

  async editProductPost(req: Request, res: Response, next: NextFunction){
    await this.productsRepository.update(req.body);
    res.redirect('/products');
  }

  async productInfo(req: Request, res: Response, next: NextFunction) {
    //console.log('--req.params.id ', req.params.id);
    
    const product = await this.productsRepository.getById(req.params.id);
      
    res.render('product', {
      layout: 'empty',
      title_1: product ?`Товар ${product.title}`: "Товар не найден", // это попадает в head.hbs
      product
    })
    //res.sendFile(path.join(__dirname,  'test.html')) //  попрежнему можно
  }


}