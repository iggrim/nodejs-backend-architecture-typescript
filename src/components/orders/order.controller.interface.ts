import { NextFunction, Request, Response } from "express";

export interface IOrderController {
  
  getOrder: (req: Request, res: Response, next: NextFunction) => void;
  addToOrder: (req: Request, res: Response, next: NextFunction) => void;
}