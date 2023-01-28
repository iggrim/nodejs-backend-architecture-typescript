import { NextFunction, Request, Response } from "express";

export interface IOrderController {
  
  getOrders: (req: Request, res: Response, next: NextFunction) => void;
  addToOrder: (req: Request, res: Response, next: NextFunction) => void;
}