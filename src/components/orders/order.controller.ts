import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../../types";
import { BaseController } from "../common/base.controller";
import { IOrderController } from "./order.controller.interface";
import { OrderService } from './order.service'

import "reflect-metadata";

@injectable()
export class OrderController extends BaseController implements IOrderController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.OrderService) private orderService: OrderService,
  ) {
    super(loggerService);
    this.bindRoutes([  // bindRoutes из BaseController
      { path: "/orders", method: "get",func: this.getOrders },
      { path: "/orders", method: "post",func: this.addToOrder },
    ]);
  }

  async addToOrder(req: Request, res: Response, next: NextFunction){
    //console.log('---req.user ', req.user);
    await this.orderService.createOrder(req.user._id);
    
    //await this.orderService.createOrder(req.user);

    res.redirect("/orders");
  }
  
  async getOrders(req: Request, res: Response, next: NextFunction){
    const orders = await this.orderService.getRecords(req.user._id);
    console.log('--- getOrders orders ', orders);
    // добавить запрос на получение ордера

    res.render('orders', { // orders-название страницы orders.hbs
      isOrder: true,
      title: 'Заказы'
    })
  }
}