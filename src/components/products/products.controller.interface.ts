import { NextFunction, Request, Response } from 'express';

export interface IProductsController {
	home: (req: Request, res: Response, next: NextFunction) => void;
	addGet: (req: Request, res: Response, next: NextFunction) => void;
	addProduct: (req: Request, res: Response, next: NextFunction) => void;
  products: (req: Request, res: Response, next: NextFunction) => void;
  remove: (req: Request, res: Response, next: NextFunction) => void;
}