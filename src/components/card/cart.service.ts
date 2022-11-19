import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ICartService } from "./cart.service.interface";
import { Cart } from './cart.entity';
import { CartModel } from './cart.model';
import { CartRepository } from "./cart.repository";
import { Schema } from 'mongoose';
import { ProductModel } from '../products/products.model'

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.CartRepository) private cardRepository: CartRepository
  ) {}

  
  async createCarttItem(userId: Schema.Types.ObjectId, productId: string) {
    //console.log('userId, productId ' , userId , productId);
    const cartUser = await CartModel.findById(userId);
    
    
    
    if (!cartUser) {
      const productItem =  await ProductModel.findById(productId);
      const cartItem = new Cart(userId, 1, productItem?._id);
      // console.log('cartItem.usreId ' , cartItem.usreId);
      //console.log('cartItem.items ' , cartItem.items[0].count);
      this.cardRepository.addToCart(cartItem);

    }
  }
}
