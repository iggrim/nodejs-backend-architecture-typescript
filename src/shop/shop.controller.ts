import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IShopController } from './shop.controller.interface';
import { ProductsService } from '../products/products.service';
import { ProductsRepository} from '../products/products.repository';
import 'reflect-metadata';


@injectable()
export class ShopController extends BaseController implements IShopController {
  /**
  Напоминание.
  В конструкторе ключевое слово super() используется как функция, вызывающая 
  родительский конструктор. Её необходимо вызвать до первого обращения к ключевому 
  слову this в теле конструктора. Ключевое слово super также может быть использовано 
  для вызова функций родительского объекта.
   */
	constructor() {
		super();
		this.bindRoutes([
			{ path: '/', method: 'get', func: this.home },
			{ path: '/add-product', method: 'get', func: this.addGet },
			{ path: '/add-product', method: 'post', func: this.addPost },
			{ path: '/products', method: 'get', func: this.products }
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
  
  const productsService = new ProductsService()
  productsService.createProduct(req.body);
  
  res.redirect('/products')
}

async products(req: Request, res: Response, next: NextFunction) {
  const products = await ProductsRepository.getAll();
  console.log('--products ', products);

  res.render('products', {
    title_1: 'Товары',
    isProducts: true,
    products
  })
}

}