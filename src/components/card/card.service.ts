import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ICardService } from "./card.service.interface";
import { CardDto } from './card.dto';
import { CardItem } from "./card.entity";
import { CardRepository} from './card.repository'
// import { Product } from "./product.entity";
// import { ProductDto } from './product.dto';
// import { ProductsRepository} from './products.repository'
// import { v4 as uuidv4 } from 'uuid';


// @injectable()
// export class ProductsService implements IProductsService{
//   constructor(
//     @inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository
//   ){ }
//   async createProduct({title, price, img }: ProductDto): Promise<Product>{
//     const id = uuidv4();
//     const newProduct = new Product(title, price, img, id);
    
//     //const newRepository = this.productsRepository;
//     await this.productsRepository.save(newProduct);

//     return newProduct;
//   }
// }

@injectable()
export class CardService implements ICardService{
  constructor(
    @inject(TYPES.CardRepository) private cardRepository: CardRepository
  ){ }

  // Деструктурирующее присваивание. Разбор объекта ProductDto
  async createCardtItem({title, price, img, id }: CardDto): Promise<CardItem>{
    const newCardItem = new CardItem(title, price, img, id);
    await this.cardRepository.add(newCardItem);

    return newCardItem; //  а нужно ли?
  }
}