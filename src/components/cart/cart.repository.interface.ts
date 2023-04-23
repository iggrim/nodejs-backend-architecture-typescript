import { Cart } from "./cart.entity";
import { ICart } from "./cart.model.interface";
import { IProductModel } from "../products/products.model.inerface";
import { Schema, Types, LeanDocument } from "mongoose";

export interface ICartRepository {
  
  addToCart: (cartUser: (ICart & { _id: Types.ObjectId})) => Promise<void>;

  deleteCart: (userId: Schema.Types.ObjectId) => Promise<void>;

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
  
  deleteFromCart: (artUser: ICart & { _id: Types.ObjectId}) => Promise<(ICart & { _id: Types.ObjectId }) | null>;
}
