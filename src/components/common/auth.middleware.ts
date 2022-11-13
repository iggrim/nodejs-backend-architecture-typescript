import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../users/user.model';


export class AuthMiddleware implements IMiddleware {
	
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// операция асинхронная надо await UserModel.findById('636d3ab9063b041167f36f39') 
			const user =  await UserModel.findById('636ffcdab825996e9c97ae90') // временно
			
			// req.user = user.lean().exec(function(error, record) {
			// 	if(record){
			// 		console.log('--auth.middleware user пользователь найден', record._id);
			// 	}		
			// });
			if(user)
			req.user = user;
			//console.log('--auth пользователь найден', user );
			next()
		} catch (e) {
			console.log(e)
		}
	}

}
