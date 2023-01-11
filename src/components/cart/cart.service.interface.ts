import { Schema, Types, LeanDocument } from "mongoose";
import { ICart } from "./cart.model.interface";

export interface ICartService {
  createCartItem: (
    userId: Schema.Types.ObjectId,
    productId: string
  ) => Promise<void>;
  //deleteFromCart: (userId: Schema.Types.ObjectId, productId: string) => Promise<void>;
  deleteFromCart: (
    userId: Schema.Types.ObjectId,
    productId: string
  ) => Promise<
    { productId: Schema.Types.ObjectId; count: number }[] | undefined
  >;

  getReordById: (
    userId: string
  ) => Promise<(ICart & { _id: Types.ObjectId }) | null>;
  getReord: (
    userId: string
  ) => Promise<(ICart & { _id: Types.ObjectId }) | null>;
  //getByIdObjectJs: (userId: Schema.Types.ObjectId) => Promise<LeanDocument<ICart & { _id: Types.ObjectId;}> | null>;
  getByIdObjectJs: (
    userId: Schema.Types.ObjectId
  ) => Promise<
    { productId: Schema.Types.ObjectId; count: number }[] | undefined
  >;
  computePrice: (
    cartUser: { productId: Schema.Types.ObjectId; count: number }[] | undefined
  ) => number | undefined;
}
