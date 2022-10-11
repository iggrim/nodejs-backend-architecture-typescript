import { NextFunction, Request, Response } from 'express';

export interface ICardController {
	addToCard: (req: Request, res: Response, next: NextFunction) => void;
	getCard: (req: Request, res: Response, next: NextFunction) => void;
	deleteFromCard: (req: Request, res: Response, next: NextFunction) => void;
}