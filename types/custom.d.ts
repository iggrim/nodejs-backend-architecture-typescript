//import { Document, Types } from 'mongoose';

// declare namespace Express {
// 	export interface Request {
// 		user: Types.ObjectId | JwtPayload;
// 		user: Document<unknown, any, IUser> & IUser & {	_id: Types.ObjectId;} | JwtPayload;
// 	}
// }

declare namespace Express {
	export interface Request {
		user: Types.ObjectId | JwtPayload;
		//user: Document<unknown, any, IUser> & IUser & {	_id: Types.ObjectId;} | JwtPayload;
	}
}