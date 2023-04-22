import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { IProductsService } from "./products.service.interface";
import { Product } from "./product.entity";
import { ProductDto } from './product.dto';
import { ProductsRepository} from './products.repository';
import { IProductModel } from './products.model.inerface';
import { ProductModel } from './products.model';
import { Schema, Types, LeanDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


@injectable()
export class ProductsService implements IProductsService{
  constructor(
    @inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository
  ){ }
  
  // Деструктурирующее присваивание. Разбор объекта ProductDto
  // и из rec.user вытаскиваем userId:
  async createProduct({title, price, img }: ProductDto, userId: Schema.Types.ObjectId): Promise<Product> {   
      
      const newProduct = new Product(title, price, img, userId);
      console.log('-------productsService newProduct: ', newProduct )
      await this.productsRepository.save(newProduct);
      
      return newProduct;
  }

  async allRecords(): Promise<(LeanDocument<IProductModel & { _id: Types.ObjectId; }>[])>{
    const products = await this.productsRepository.getAll();  
    return products;
  }

  async getReordById(id: string): Promise<LeanDocument<IProductModel & { _id: Types.ObjectId; }> | null >{
    const product = await this.productsRepository.getById(id);  
    return product;
  }

  async updateRecord(id: string, product:  ProductDto): Promise<void>{
    await this.productsRepository.update(id, product);
  }

  async deleteRecordById(id:string): Promise<void>{
    await this.productsRepository.deleteById(id);
  }
}

