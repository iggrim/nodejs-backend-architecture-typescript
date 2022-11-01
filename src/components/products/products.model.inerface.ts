import { Document } from 'mongoose';

export interface IProductModel extends Document {
  title: String;
  price: Number;
  img: String;
}