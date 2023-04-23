import { Schema } from 'mongoose';

export class Cart {
  private readonly _items: [{count: number, productId: Schema.Types.ObjectId }]
  
  constructor(
    private readonly _userId: Schema.Types.ObjectId,
    private readonly _count: number,
    private readonly _productId: Schema.Types.ObjectId, 
  ) 
  {
    // конструируем _items
    this._items = [{
      count: this._count,
      productId: this._productId,
    }]
  }
 
  // у объекта класса Cart будет два публичных поля - usreId и items
  public get usreId(): Schema.Types.ObjectId {
    return this._userId;
  }
  public get items(): [{count: number, productId: Schema.Types.ObjectId }] {
    return this._items;
  }
 
}
