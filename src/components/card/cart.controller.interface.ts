import { NextFunction, Request, Response } from "express";

export interface ICartController {
  addToCart: (req: Request, res: Response, next: NextFunction) => void;
  getCart: (req: Request, res: Response, next: NextFunction) => void;
  deleteFromCart: (req: Request, res: Response, next: NextFunction) => void;
}
