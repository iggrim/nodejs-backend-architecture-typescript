export class CartItem {
  constructor(
    private readonly _title: string,
    private readonly _price: number,
    private readonly _img: string
  ) //private readonly _id: string,
  //private readonly _count: number,
  {}

  public get img(): String {
    return this._img;
  }
  public get price(): Number {
    return this._price;
  }
  public get title(): String {
    return this._title;
  }
  // public get id(): string {
  //   return this._id;
  // }
  // public get count(): number {
  //   return this._count;
  // }
}
