import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { ProductsService } from '../products/products.service';
import { ProductsRepository} from '../products/products.repository';



export class ShopController extends BaseController {
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
  console.log('req.body ', req.body)
  
  const productsService = new ProductsService()
  productsService.createProduct(req.body);
  
  res.redirect('/products')
}

async products(req: Request, res: Response) {
  const products = await ProductsRepository.getAll();
  console.log('--products ', products);

  res.render('products', {
    title_1: 'Товары',
    isProducts: true,
    products
  })
}

}