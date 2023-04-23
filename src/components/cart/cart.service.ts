import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ICartService } from "./cart.service.interface";
import { Cart } from "./cart.entity";
import { CartModel } from "./cart.model";
import { ICart } from "./cart.model.interface";
import { CartRepository } from "./cart.repository";
import { Schema, Types, LeanDocument } from "mongoose";
import { ProductsService } from "../products/products.service";

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.CartRepository) private cartRepository: CartRepository,
    @inject(TYPES.ProductsService) private productsService: ProductsService
  ) {}

  async addToCart(userId: Schema.Types.ObjectId, productId: string) {
    const productItem = await this.productsService.getReordById(productId);
    const cartUser = await this.cartRepository.getRecord(userId.toString());

    if (!cartUser) {
      // если еще нет корзины
      // --может cartItem создать через класс Cart внедренный через DI?--
      const cartItem = new Cart(userId, 1, productItem?._id);
      const cartUser = new CartModel({
        userId: cartItem.usreId,
        items: cartItem.items,
      });
      
      this.cartRepository.addToCart(cartUser);// сохраняем документ

    } else { // если корзина есть
      const items = [...cartUser.items]; //  копия cartUser.items
      const idx = items.findIndex(
        (item) => item.productId.toString() === productItem?._id.toString()
      );
      // можно такэе по товару сразу посчитать общую сумму

      if (idx >= 0) {
        // увеличиваем count для одного конкретного товара
        items[idx].count = items[idx].count + 1;
      } else {
        
        items.push({ 
          count: 1,
          productId: productItem?._id,
        });
      }
      cartUser.items = items;
      this.cartRepository.addToCart(cartUser);// сохраняем документ
    }

    //this.cartRepository.addToCart(userId, productItem);
  }

  // async deleteFromCart(userId: Schema.Types.ObjectId, productId: string): Promise<{ productId: Schema.Types.ObjectId; count: number }[] | undefined> {
  
  async deleteFromCart(userId: Schema.Types.ObjectId, productId: string): Promise<{
    productId: Schema.Types.ObjectId;
    count: number;
}[] | undefined> {
    
    const cartUser = await CartModel.findOne({ userId: userId.toString() });

    if (!cartUser) {
      return undefined;
    } else {
      let items = [...cartUser.items]; //  копия cartUser.items
      const idx = items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      //console.log('---items ', items);
      //console.log('---productId ', productId); // undefined

      if (items[idx].count === 1) {
        items = items.filter( // все остальные items
          (item) => item.productId.toString() !== productId.toString()
        );
      } else {
        items[idx].count--;
      }

      cartUser.items = items; // items- массив 
      // операции с БД асинхронные, не забываем про await
      await this.cartRepository.deleteFromCart(cartUser); 

    }
    const refeshCartUser = await this.getByIdObjectJs(userId);
    return refeshCartUser;
  }

  async getReordById(
    userId: string
  ): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const record = this.cartRepository.getById(userId);
    return record;
  }

  async getReord(
    userId: string
  ): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const record = this.cartRepository.getRecord(userId);
    return record;
  }

  mapCartItems(cartUser: LeanDocument<ICart & { _id: Types.ObjectId }> | null) {
    if (cartUser) {
      const cartUserObjJs = cartUser.items.map((c) => ({
        productId: c.productId,
        count: c.count,
      }));
      return cartUserObjJs;
    }

    //return cartUser.items.map(c => console.log(' --prod ', c.productId ))
  }

  computePrice(
    cartUser: { productId: Schema.Types.ObjectId; count: number }[] | undefined
  ): number | undefined {
    if (cartUser) {
      return cartUser.reduce((total: number, product: any) => {
        return (total += product.productId.price * product.count);
      }, 0);
    }
  }

  async getByIdObjectJs(userId: Schema.Types.ObjectId): Promise<{ productId: Schema.Types.ObjectId; count: number }[] | undefined> {
    //
    const cartUser = await this.cartRepository.getByIdObjectJs(userId);

    if (cartUser) {
      const products = this.mapCartItems(cartUser);
      //console.log('---products', products);

      return products;
    }
  }
}
