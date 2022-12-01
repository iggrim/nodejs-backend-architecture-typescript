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
    @inject(TYPES.CartRepository) private cardRepository: CartRepository,
    @inject(TYPES.ProductsService) private productsService: ProductsService
  ) {}

  async createCartItem(userId: Schema.Types.ObjectId, productId: string) { 
    const productItem = await this.productsService.getReordById(productId);
    this.cardRepository.addToCart(userId, productItem );
  } 

  async getReordById(userId: string): Promise<(ICart & { _id: Types.ObjectId }) | null> {
    const record = this.cardRepository.getById(userId);
    return record;
  }

  async getReord(userId: string): Promise<(ICart & {_id: Types.ObjectId;}) | null> {
    const record = this.cardRepository.getRecord(userId)
    return record;
  }

  mapCartItems(cartUser: (ICart & { _id: Types.ObjectId | null;}) ) {
    if(cartUser)
    return cartUser.items.map(c => ({ productId: c.productId, count: c.count })) 
    //return cartUser.items.map(c => console.log(' --prod ', c.productId )) 
  }

  async getByIdobjectJs(userId: Schema.Types.ObjectId): Promise<{ productId: Schema.Types.ObjectId; count: number;}[] | undefined> { 
    const cartUser = await this.cardRepository.getByIdobjectJs(userId);

    if(cartUser){
      const products = this.mapCartItems(cartUser);
      //console.log('---products', products);  
      /*
      _doc существует на объекте mongoose.
      mongooseModel.findOne возвращает саму модель, у модели есть структура 
      (protected поля). При попытке обращения к полям объекта будут доступны
      только публичные поля  объекта.  попробовать что-то типа JSON.stringify 
      */
      //products?.map(p => console.log('---products', JSON.parse(JSON.stringify(p))._doc) )
      return products; 
    } 

    
  }

}
