import express, { Express } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
//import { Server } from 'http';
import { ProductsController } from "./components/products/products.controller";
import { CartController } from "./components/card/cart.controller";
import * as path from "path";
import { create, ExpressHandlebars } from "express-handlebars";
import { ILogger } from "./components/logger/logger.interface";
import { IExeptionFilter } from "./components/errors/exeption.filter.interface";
//import { ExeptionFilter } from './components/errors/exeption.filter';
//import { LoggerService } from './components/logger/logger.service';
import { json } from "body-parser";
import mongoose from "mongoose";
import { Mongoose } from "mongoose";
import { UserModel } from './components/users/user.model';
import { AuthMiddleware } from "./components/common/auth.middleware";
import { Catch404Midleware } from './components/common/404.midlware';
import "reflect-metadata";


@injectable()
export class App {
  app: Express;
  port: Number;
  hbs: ExpressHandlebars;
  mongoose: Mongoose;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ProductsController)
    private productsController: ProductsController,
    @inject(TYPES.CartController) private cardController: CartController
  ) {
    this.app = express();
    this.port = 3000;
    this.mongoose = mongoose;
    this.hbs = create({
      defaultLayout: "main",
      extname: "hbs",
    });

    this.app.engine("hbs", this.hbs.engine);
    //this.app.engine('.hbs', engine({extname: '.hbs'}));
    this.app.set("view engine", "hbs");
    this.app.set("views", path.join(__dirname, "views-handlebars"));

    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.urlencoded({ extended: true }));
  }

  useMiddleware(): void {
    this.app.use(json());
    const authMiddleware = new AuthMiddleware();
    this.app.use(authMiddleware.execute.bind(authMiddleware));
    
  }

  useRotes() {
    this.app.use("/", this.productsController.router); // .router - это геттер в base.controller.ts
    this.app.use("/", this.cardController.router); // .router - это геттер в base.controller.ts
    const catch404Midleware = new Catch404Midleware();
    this.app.use(catch404Midleware.execute.bind(Catch404Midleware));
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  // useMiddlewareUser() {
  //   async (req, res, next) => {
  //     try {
  //       const user = await UserModel.findById('63652911b0321826dbc312c7')
  //       req.user = user
  //       next()
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // }
 
  public async init() {
    this.useMiddleware();
    this.useRotes();
    this.useExeptionFilters();

    //const DB_URI = 'mongodb://mongo:27017/shop';
    const DB_URI = "mongodb://localhost:27017/shop";

    try {
      await this.mongoose.connect(DB_URI);
      this.logger.log("Mongodb connected");
      this.app.listen(this.port);
      this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    } catch (e) {
      this.logger.log("Ошибка подключения к mongodb", e);
    }

    const candidate = await UserModel.findOne();

    if (!candidate) {
      const user = new UserModel({
        email: 'harry@mail.ru',
        name: 'Harry',
        cart: {items: []}
      })
      await user.save() // сохранякм документ
    }

  }
}
