import { User } from './user.entity';
import { ObjectId, LeanDocument, Query, Types } from 'mongoose';
import {IUser} from './user.model.interface'

export interface IUsersRepository {
	create: (user: User) => Promise<IUser>;
	find: () => Promise<IUser | null>;
	//find: (email: string) => Promise<IUser | null>;

	//find: () => Promise<LeanDocument<IUser & { _id: ObjectId; }> | null >;
}