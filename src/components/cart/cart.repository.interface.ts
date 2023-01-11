import { Cart } from "./cart.entity";
import { ICart } from "./cart.model.interface";
import { IProductModel } from "../products/products.model.inerface";
import { Schema, Types, LeanDocument } from "mongoose";

export interface ICartRepository {
  //addToCart: (item: Cart) => Promise<void>;
  addToCart: (
    userId: Schema.Types.ObjectId,
    productItem: LeanDocument<
      IProductModel & {
        _id: Types.ObjectId;
      }
    > | null
  ) => Promise<void>;

  //remove: (id: string) => Promise<void>;
  getById: (
    userId: string
  ) => Promise<(ICart & { _id: Types.ObjectId }) | null>;
  getRecord: (
    userId: string
  ) => Promise<(ICart & { _id: Types.ObjectId }) | null>;

  getByIdObjectJs: (
    userId: Schema.Types.ObjectId
  ) => Promise<LeanDocument<ICart & { _id: Types.ObjectId }> | null>;
  deleteFromCart: (
    userId: Schema.Types.ObjectId,
    productId: string
  ) => Promise<(ICart & { _id: Types.ObjectId }) | null>;
}
