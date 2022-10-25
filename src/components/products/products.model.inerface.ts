import { Document } from 'mongoose';

export interface IProductModel extends Document {
  title: string;
  price: Number;
  img: string;
}