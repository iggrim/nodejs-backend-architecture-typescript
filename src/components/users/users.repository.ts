import { UserModel } from './user.model';
import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { User } from './user.entity';
import { IUser } from './user.model.interface';
import { IUsersRepository } from './users.repository.interface';
//import { ObjectId, Document } from 'mongoose';

@injectable()
export class UsersRepository implements IUsersRepository {
	
	async create({ email, password, name }: User): Promise<IUser> {
      const user = new UserModel({
        email: 'harry@mail.ru',
        name: 'Harry',
        cart: {items: []}
      })
      await user.save() // сохранякм документ
      console.log('Пользователь создан ', user._id);
   return user;
	}

	async find(): Promise<IUser | null > {
		const candidate = await UserModel.findOne();
		return candidate;
	}
}
