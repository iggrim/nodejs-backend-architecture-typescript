import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../../types";
import { BaseController } from "../common/base.controller";
import { IOrderController } from "./order.controller.interface";
import "reflect-metadata";

@injectable()
export class OrderController extends BaseController implements IOrderController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    
  ) {
    super(loggerService);
    this.bindRoutes([  // bindRoutes из BaseController
      { path: "/orders", method: "get",func: this.getOrder },
    ]);
  }
  
  async getOrder(req: Request, res: Response, next: NextFunction){
    res.render('orders', { // orders-название страницы orders.hbs
      isOrder: true,
      title: 'Заказы'
    })
  }
}