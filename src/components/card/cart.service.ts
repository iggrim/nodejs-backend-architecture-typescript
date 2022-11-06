import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ICartService } from "./cart.service.interface";
import { CartDto } from "./cart.dto";
import { CartItem } from "./cart.entity";
import { CartRepository } from "./cart.repository";

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.CartRepository) private cardRepository: CartRepository
  ) {}

  // Деструктурирующее присваивание. Разбор объекта ProductDto
  //async createCarttItem({title, price, img }: CartDto): Promise<CartItem>{
  async createCarttItem({ title, price, img }: CartDto) {
    //const newCartItem = new CartItem(title, price, img,  );
    //await this.cardRepository.add(newCartItem);
    //return newCartItem; //  а нужно ли?
  }
}
