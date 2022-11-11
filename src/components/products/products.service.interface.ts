import { Product } from './product.entity';
import {IProductModel} from './products.model.inerface'
import { ProductDto } from './product.dto';
import { ObjectId, LeanDocument } from 'mongoose';

export interface IProductsService {
  createProduct:(product: ProductDto, id: ObjectId) => Promise<Product>;
  allRecords:() => Promise<(LeanDocument<IProductModel & { _id: ObjectId; }>[])>;
  getReordById:(id: string) => Promise<LeanDocument<IProductModel & { _id: ObjectId; }> | null >;
  updateRecord(id: string, product:  ProductDto): Promise<void>;
  deleteRecordById(id:string): Promise<void>;
}