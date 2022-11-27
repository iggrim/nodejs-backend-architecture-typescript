import { NextFunction, Request, Response } from "express";
import path from "path";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../../types";
import { BaseController } from "../common/base.controller";
import { ICartController } from "./cart.controller.interface";
import { ProductsRepository } from "../products/products.repository";
import { CartRepository } from "./cart.repository";
import { CartService } from "./cart.service";
import "reflect-metadata";

@injectable()
export class CartController extends BaseController implements ICartController {
  /**
  Напоминание.
  В конструкторе ключевое слово super() используется как функция, вызывающая 
  родительский конструктор. Её необходимо вызвать до первого обращения к ключевому 
  слову this в теле конструктора. Ключевое слово super также может быть использовано 
  для вызова функций родительского объекта.
   */
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository,
    @inject(TYPES.CartService) private cardService: CartService,
    @inject(TYPES.CartRepository) private cardRepository: CartRepository
  ) {
    super(loggerService);
    this.bindRoutes([
      { path: "/cart-products", method: "get", func: this.getCart },
      { path: "/cart-products/add", method: "post", func: this.addToCart },
      {
        path: "/cart-products/remove/:id",
        method: "delete",
        func: this.deleteFromCart,
      },
    ]);
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    const cart = await this.cardService.createCartItem(req.user._id, req.body.id);

    //console.log('---product ', product);

    //if (product) await this.cardService.createCarttItem(product);

    res.redirect("/cart-products");
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    // const cart = await this.cardRepository.fetchItems()
    // console.log('---cart ', cart);
    // res.render('cart-products', {
    //   title_1: 'Корзина',
    //   isCarad: true,
    //   cart,
    // })
  }

  async deleteFromCart(req: Request, res: Response, next: NextFunction) {
    //const cart = await this.cardRepository.remove(req.params.id);
    //res.status(200).json(cart);
  }
}
