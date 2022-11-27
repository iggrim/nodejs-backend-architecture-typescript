import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ICartService } from "./cart.service.interface";
import { Cart } from "./cart.entity";
import { CartModel } from "./cart.model";
import { ICart } from "./cart.model.interface";
import { CartRepository } from "./cart.repository";
import { Schema, Types } from "mongoose";
import { ProductsService } from "../products/products.service";

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.CartRepository) private cardRepository: CartRepository,
    @inject(TYPES.ProductsService) private productsService: ProductsService
  ) {}

  async createCartItem(userId: Schema.Types.ObjectId, productId: string) {
    
    const cartUser = await this.getReordById(userId);
    const productItem = await this.productsService.getReordById(productId);

    if (!cartUser) {
      const cartItem = new Cart(userId, 1, productItem?._id);
      this.cardRepository.addToCart(cartItem);
    } else {
      const items = [...cartUser.items];
      const idx = items.findIndex(
        (item) => item.productId.toString() == productId
      );

      if (idx >= 0) {
        items[idx].count = items[idx].count + 1;
      } else {
        items.push({
          count: 1,
          productId: productItem?._id,
        });
      }
    }
  } // end createCarttItem

  async getReordById(userId: Schema.Types.ObjectId): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const record = this.cardRepository.getById(userId);
    return record;
  }
}
