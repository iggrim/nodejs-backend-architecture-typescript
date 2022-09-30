import express, {Express} from 'express'
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { Server } from 'http';
import { ShopController } from './shop/shop.controller'
import * as path from "path";
import { create, ExpressHandlebars } from 'express-handlebars';
//import { engine } from 'express-handlebars';
import 'reflect-metadata';


@injectable()
export class App {
  app: Express;
  port: Number;
  hbs: ExpressHandlebars;


  constructor(
    @inject(TYPES.ShopController) private shopController: ShopController
  ) {
    this.app = express();
    this.port = 3000;
    this.hbs = create({ 
      defaultLayout: 'main',
      extname: 'hbs' 
    });

    this.app.engine('hbs', this.hbs.engine);
    //this.app.engine('.hbs', engine({extname: '.hbs'}));
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(__dirname, "views-handlebars"));

    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.urlencoded({extended: true}))
  }


  useRotes() {
    this.app.use('/', this.shopController.router); // .router - это геттер в base.controller.ts 
  }

  public async init() {
    this.useRotes();
    this.app.listen(this.port)
    console.log(`Server is running on port ${this.port}`)
  }
}