import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';


export class Catch404Midleware implements IMiddleware{
  execute(req: Request, res: Response, next: NextFunction): void {
    next(new HTTPError(404, 'такой страницы нет'));
  }
}