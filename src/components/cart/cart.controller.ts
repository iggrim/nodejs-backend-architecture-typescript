import { NextFunction, Request, Response } from "express";
//import path from "path";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../../types";
import { BaseController } from "../common/base.controller";
import { ICartController } from "./cart.controller.interface";
//import { ProductsRepository } from "../products/products.repository";
//import { CartRepository } from "./cart.repository";
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
    //@inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository,
    @inject(TYPES.CartService) private cartService: CartService //@inject(TYPES.CartRepository) private cartRepository: CartRepository
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
    await this.cartService.createCartItem(req.user._id, req.body.id);

    res.redirect("/cart-products");
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    // после сохранения корзины как экземпляра Mongoose Document
    // получаем корзину как объект JS, а не документ Mongoose (lean())
    console.log('--req.user ', req.user)
    const cart_arr_obj = await this.cartService.getByIdObjectJs(req.user._id);
    
    let price;
    let cart = null;

    if(cart_arr_obj?.length){
      price = this.cartService.computePrice(cart_arr_obj);
      cart = JSON.parse(JSON.stringify(cart_arr_obj));
    }
    
    //console.log('---cart ', cart );
    res.render("cart-products", {
      title_1: "Корзина",
      isCart: true,
      cart,
      price: price,
    });
  }

  async deleteFromCart(req: Request, res: Response, next: NextFunction) {
    const cartUserItems = await this.cartService.deleteFromCart(
      req.user._id,
      req.params.id
    );
    const cart = JSON.parse(JSON.stringify(cartUserItems));

    //console.log('---cart ', cart);
    //  сюда в объект добавить cart  и  price
    res.status(200).json(cart);
  }
}
