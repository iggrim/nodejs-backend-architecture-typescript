import { IProductsService } from "./products.service.interface";
import { Product } from "./product.entity";
import { ProductsRepository} from './products.repository'
import { uuid } from 'uuidv4';

export class ProductsService implements IProductsService{
  async createProduct({title, price, img }: Product): Promise<Product>{
    const id = uuid();
    const newProduct = new Product(title, price, img, id);
    
    const newRepository = new ProductsRepository();
    await newRepository.save(newProduct);

    return newProduct;
  }
}

