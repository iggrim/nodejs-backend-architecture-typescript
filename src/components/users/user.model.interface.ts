export interface IUser {
  name: string;
  email: string;
  cart: {items: Array<{count: number, productId: string}>[]};
}