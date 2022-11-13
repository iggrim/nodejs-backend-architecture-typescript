import {Schema, Types, model} from 'mongoose';
import { IUser } from './user.model.interface';


const UserSchema = new Schema({
 // _id: Types.ObjectId, 

  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
})

// Модели создаются из схем методом mongoose.model():
export const UserModel = model<IUser>('User', UserSchema); // 'User' - название модели