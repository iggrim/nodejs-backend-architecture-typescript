//import { uuid } from 'uuidv4';

export class Product {
    
  constructor(
    private  _id: string,  
    private  _title: string, 
    private  _price: number, 
    private  _img: string

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