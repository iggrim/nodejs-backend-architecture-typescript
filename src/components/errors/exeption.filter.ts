import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../../types';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
	
		this.logger.log('-- ExeptionFilter  ')
		
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
			//res.status(err.statusCode).send('404, такой страницы нет');
		} else {
			this.logger.error(`Ошибка (не http) ${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
