import { Product } from './product.entity';
import {IProductModel} from './products.model.inerface'
import { ProductDto } from './product.dto';
import { Schema, Types, LeanDocument } from 'mongoose';


export interface IProductsService {
  createProduct:(product: ProductDto, userId: Schema.Types.ObjectId) => Promise<Product>;
  allRecords:() => Promise<(LeanDocument<IProductModel & { _id: Types.ObjectId; }>[])>;
  getReordById:(id: string) => Promise<LeanDocument<IProductModel & { _id: Types.ObjectId; }> | null >;
  updateRecord(id: string, product:  ProductDto): Promise<void>;
  deleteRecordById(id:string): Promise<void>;
}