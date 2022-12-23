import { Schema } from 'mongoose';

export class Order {
  private readonly _products: [{count: number, product: Object }]
  private readonly _user:  { userId: Schema.Types.ObjectId }
  
  constructor(
    private readonly _product: Object,
    private readonly _count: number,
    private readonly _userId: Schema.Types.ObjectId,  
    private readonly _date: Date,  
  )  {
    this._products = [{
      count: this._count,
      product: this._product,
    }];

    this._user = { userId: this._userId};
       
  }
 
  public get products(): [{count: number, product: Object }] {
    return this._products;
  }
  
  public get user(): { userId: Schema.Types.ObjectId } {
    return this._user;
  }

  public get date(): Date {
    return this._date;
  }
 
}
