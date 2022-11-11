//import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
//import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUser } from './user.model.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		//@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	// Деструктурирующее присваивание. Разбор объекта UserRegisterDto
	async createUser({ email, name, password }: UserRegisterDto): Promise<IUser | null> {
		const newUser = new User(email, name);
		
		
		//const existedUser = await this.usersRepository.find(email);
		const existedUser = await this.usersRepository.find();
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async find(): Promise<IUser | null > {
		return this.usersRepository.find();
	}

	//async validateUser(dto: UserLoginDto): Promise<boolean> {
	//	return true;
	//}
}
