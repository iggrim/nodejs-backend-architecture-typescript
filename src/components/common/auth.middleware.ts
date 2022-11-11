import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../users/user.model';


export class AuthMiddleware implements IMiddleware {
	
	execute(req: Request, res: Response, next: NextFunction): void {
		try {
			const user =  UserModel.findById('636d3ab9063b041167f36f39') // временно
			req.user = user.lean().exec(function(error, record) {
				if(record){
					console.log('--auth.middleware user пользователь найден', record._id);
				}		
			});
			//console.log('--auth.middleware user пользователь найден', user );
			next()
		} catch (e) {
			console.log(e)
		}
	}

}
