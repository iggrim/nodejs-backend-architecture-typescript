import { Schema } from 'mongoose';

export interface ICartService {
  createCarttItem: (userId: Schema.Types.ObjectId, productId: string) => Promise<void>,

}
