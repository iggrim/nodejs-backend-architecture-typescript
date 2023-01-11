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

  async createCartItem(userId: Schema.Types.ObjectId, productId: string) {
    const productItem = await this.productsService.getReordById(productId);
    this.cartRepository.addToCart(userId, productItem);
  }

  //async deleteFromCart(userId: Schema.Types.ObjectId, productId: string) {
  async deleteFromCart( userId: Schema.Types.ObjectId,  productId: string): Promise<{ productId: Schema.Types.ObjectId; count: number }[] | undefined > {
    await this.cartRepository.deleteFromCart(userId, productId);

    // if(!cartUser){
    //   return ;
    // } else {
    //   const cartUserItems = cartUser.items.map(c => ({ productId: c.productId, count: c.count }));
    //   return cartUserItems;
    // }
    const cartUser = await this.getByIdobjectJs(userId);

    return cartUser;
  }

  async getReordById( userId: string ): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const record = this.cartRepository.getById(userId);
    return record;
  }

  async getReord( userId: string ): Promise<(ICart & { _id: Types.ObjectId }) | null> {
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

  async getByIdobjectJs(
    userId: Schema.Types.ObjectId
  ): Promise<
    { productId: Schema.Types.ObjectId; count: number }[] | undefined
  > {
    //
    const cartUser = await this.cartRepository.getByIdobjectJs(userId);

    if (cartUser) {
      const products = this.mapCartItems(cartUser);
      //console.log('---products', products);

      return products;
    }
  }
}
