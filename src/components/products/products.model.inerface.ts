import { Schema, Types, Document } from 'mongoose';

export interface IProductModel extends Document {
  title: string;
  price: number;
  img: string;
  userId: Schema.Types.ObjectId; // сылка на id  пользователя создавшего товар
    
}