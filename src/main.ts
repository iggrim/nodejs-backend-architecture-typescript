import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from "./app";
import { ILogger } from './components/logger/logger.interface';
import { LoggerService } from './components/logger/logger.service';
import { IExeptionFilter } from './components/errors/exeption.filter.interface';
import { ExeptionFilter } from './components/errors/exeption.filter';
import { ProductsController } from './components/products/products.controller';
import { IProductsController } from './components/products/products.controller.interface';
import { ProductsService } from './components/products/products.service';
import { IProductsService } from './components/products/products.service.interface'
import { ProductsRepository } from './components/products/products.repository';
import { IProductsRepository} from './components/products/products.repository.interface';
import { CardRepository } from './components/card/card.repository';
import { ICardRepository } from './components/card/card.repository.interface';
import { ICardController } from './components/card/card.controller.interface';
import { CardController } from './components/card/card.controller';
import { CardService } from './components/card/card.service';
import { ICardService } from './components/card/card.service.interface';
//import { ProductModel }  from './components/models/products';
//import { IProductModel } from './components/models/products.inerface'



export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IProductsController>(TYPES.ProductsController).to(ProductsController);
	bind<IProductsService>(TYPES.ProductsService).to(ProductsService);
	bind<IProductsRepository>(TYPES.ProductsRepository).to(ProductsRepository).inSingletonScope();
	bind<ICardController>(TYPES.CardController).to(CardController).inSingletonScope();
	bind<ICardRepository>(TYPES.CardRepository).to(CardRepository).inSingletonScope();
	bind<ICardService>(TYPES.CardService).to(CardService).inSingletonScope();
	//bind<IProductModel>(TYPES.ProductModel).to(ProductModel);
	
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
  // const app = new App(new ShopController);
  // await app.init();
  const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init(); // уже без await, т.к. app получаем из коньейнера
	return { appContainer, app };
}

bootstrap();