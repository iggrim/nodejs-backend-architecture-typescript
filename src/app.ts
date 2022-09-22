import express, {Express} from 'express'
import { Server } from 'http';
import { shopRouter } from './routers/shop'
import * as path from "path";
import { create } from 'express-handlebars';

export class App {
  app: Express;
  port: Number;
  hbs: any;
  

  constructor() {
    this.app = express();
    this.port = 3000;
    this.hbs = create({ 
      defaultLayout: 'main',
      extname: 'hbs' 
  });

    this.app.engine('hbs', this.hbs.engine);
    this.app.set('view engine', 'hbs');
    this.app.set('views', "./src/views-handlebars");

    this.app.use(express.static('public'))
  }


  useRotes() {
    this.app.use('/', shopRouter)
  }

  public async init() {
    this.useRotes();
    this.app.listen(this.port)
    console.log(`Server is running on port ${this.port}`)
  }
}