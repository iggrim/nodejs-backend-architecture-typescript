import { Schema } from 'mongoose';

export class OrdertDto{
  // products: {
  //   product: Object,
  //   count: number,
  // }[]; // массив объектов

  // user: {
  //   name: string,
  //   userId: Schema.Types.ObjectId
  // };  
  
  // date:  Date;

  product: Object;
  count: number;
  userId: Schema.Types.ObjectId;
  date:  Date;

}


 
