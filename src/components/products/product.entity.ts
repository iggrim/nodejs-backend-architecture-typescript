//import { uuid } from 'uuidv4';

export class Product {
    
  constructor(
  
    private readonly _title: string, 
    private readonly _price: number, 
    private readonly _img: string,
    private readonly _id: string, 
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
    public get id(): string {
      return this._id;
    }

}