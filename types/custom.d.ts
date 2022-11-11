import {UserModel} from '../src/components/users/user.model'

declare namespace Express {
	export interface Request {
		//user: Schema.Types.ObjectId | JwtPayload;
		user: UserModel | JwtPayload;
	}
}
