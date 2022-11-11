import { ObjectId, Document } from 'mongoose';

export interface IProductModel extends Document {
  title: string;
  price: number;
  img: string;
  userId: { // сылка на id  пользователя создавшего товар
    type: ObjectId,
    ref: 'User' // данная строка должна совпадать с названием модели User
  }
}