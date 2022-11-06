import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../users/user.model';


export class AuthMiddleware implements IMiddleware {
	
	execute(req: Request, res: Response, next: NextFunction): void {
		try {
			const user =  UserModel.findById('63652911b0321826dbc312c7')
			req.user = user
			next()
		} catch (e) {
			console.log(e)
		}
		
	}
}
