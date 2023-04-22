import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../users/user.model';


export class AuthMiddleware implements IMiddleware {
	
	async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			// операция асинхронная надо await UserModel.findById('636d3ab9063b041167f36f39') 
			const user =  await UserModel.findById('6442d07ddeb340d9661903be') // временно
			
			    console.log('--user ', user)    // почему вызывается три раза?                                
			if(user)
			req.user = user;
			
			next()
		} catch (e) {
			console.log(e)
		}
	}

}
