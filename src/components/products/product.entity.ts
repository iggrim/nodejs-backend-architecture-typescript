
import { Schema, Types } from 'mongoose';

export class Product {
    
  constructor(
  
    private readonly _title: string, 
    private readonly _price: number, 
    private readonly _img: string,
    private readonly _userId: Schema.Types.ObjectId, 
    ) {}

    public get img(): string {
      return this._img;
    }
    public get price(): number {
      return this._price;
    }
    public get title(): string {
      return this._title;
    }
    public get userId(): Schema.Types.ObjectId {
      return this._userId;
    }

}