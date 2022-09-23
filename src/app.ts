import express, {Express} from 'express'
import { Server } from 'http';
import { shopRouter } from './routers/shop'
import * as path from "path";
import { create, ExpressHandlebars } from 'express-handlebars';

export class App {
  app: Express;
  port: Number;
  hbs: ExpressHandlebars;
  

  constructor() {
    this.app = express();
    this.port = 3000;
    this.hbs = create({ 
      defaultLayout: 'main',
      extname: 'hbs' 
  });

    this.app.engine('hbs', this.hbs.engine);
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(__dirname, "views-handlebars"));

    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(express.urlencoded({extended: true}))
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