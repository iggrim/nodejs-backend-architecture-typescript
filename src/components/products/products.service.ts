import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { IProductsService } from "./products.service.interface";
import { Product } from "./product.entity";
import { ProductsRepository} from './products.repository'
import { v4 as uuidv4 } from 'uuid';


@injectable()
export class ProductsService implements IProductsService{
  constructor(
    @inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository
  ){ }
  async createProduct({title, price, img }: Product): Promise<Product>{
    const id = uuidv4();
    const newProduct = new Product(title, price, img, id);
    
    const newRepository = this.productsRepository;
    await newRepository.save(newProduct);

    return newProduct;
  }
}

