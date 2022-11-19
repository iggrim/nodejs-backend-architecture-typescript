import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../../types';
import { BaseController } from '../common/base.controller';
import { IProductsController } from './products.controller.interface';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsRepository} from './products.repository';

import 'reflect-metadata';


@injectable()
export class ProductsController
  extends BaseController
  implements IProductsController
{
  /**
  Напоминание.
  В конструкторе ключевое слово super() используется как функция, вызывающая 
  родительский конструктор. Её необходимо вызвать до первого обращения к ключевому 
  слову this в теле конструктора. Ключевое слово super также может быть использовано 
  для вызова функций родительского объекта.
   */
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ProductsService) private productsService: ProductsService,
    @inject(TYPES.ProductsRepository)
    private productsRepository: ProductsRepository
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: "/", method: "get", func: this.home },
      { path: "/add-product", method: "get", func: this.addGet },
      { path: "/add-product", method: "post", func: this.addProduct },
      { path: "/products", method: "get", func: this.products },
      { path: "/products/:id", method: "get", func: this.productInfo },
      { path: "/products/:id/edit", method: "get", func: this.showEditProduct },
      {
        path: "/product/save-edit",
        method: "post",
        func: this.editProductPost,
      },
      { path: "/product/remove", method: "post", func: this.remove },
    ]);
  }

  home(req: Request, res: Response, next: NextFunction) {
    res.render("index", {
      title_1: "Главная страница",
      isHome: true,
    });
  }

  addGet(req: Request, res: Response, next: NextFunction) {
    res.render("add-product", {
      title_1: "Добавить товар",
      isAdd: true,
    });
  }

  // addPost(req: Request<{}, {}, ProductDto>, res: Response, next: NextFunction) {
  addProduct(req: Request, res: Response, next: NextFunction) {  
    this.productsService.createProduct(req.body, req.user);
    res.redirect("/products");
  }

  async products(req: Request, res: Response, next: NextFunction) {
    
    const products = await this.productsService.allRecords();
    //console.log('--products ', products); // здесь все хорошо

    res.render("products", {
      title_1: "Товары",
      isProducts: true,
      products,
    });
  }

  async showEditProduct(req: Request, res: Response, next: NextFunction) {
    if (!req.query.allow) {
      return res.redirect("/"); // если не кастомный allow - return
    }

    const product = await this.productsService.getReordById(req.params.id);

    res.render("product-edit", {
      title_1: product ? `Редактировать ${product.title}` : "Товар не найден",
      product,
    });
  }

  async editProductPost(req: Request<{}, {}, ProductDto>, res: Response, next: NextFunction) {
    const { id } = req.body;
    delete req.body.id;

    console.log("----id", id);
    if (id)  await this.productsService.updateRecord(id, req.body);
    res.redirect("/products");
  }

  async productInfo(req: Request, res: Response, next: NextFunction) {
    //console.log('--req.params.id ', req.params.id);

    const product = await this.productsService.getReordById(req.params.id);

    res.render("product", {
      layout: "empty",
      title_1: product ? `Товар ${product.title}` : "Товар не найден", // это попадает в head.hbs
      product,
    });
    //res.sendFile(path.join(__dirname,  'test.html')) //  попрежнему можно
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productsService.deleteRecordById(req.body.id);
      res.redirect("/products");
    } catch (e) {
      console.log(e);
    }
  }
}