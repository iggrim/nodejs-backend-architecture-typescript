import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from "./app";
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


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IProductsController>(TYPES.ProductsController).to(ProductsController);
	bind<IProductsService>(TYPES.ProductsService).to(ProductsService);
	bind<IProductsRepository>(TYPES.ProductsRepository).to(ProductsRepository).inSingletonScope();
	bind<ICardController>(TYPES.CardController).to(CardController).inSingletonScope();
	bind<ICardRepository>(TYPES.CardRepository).to(CardRepository).inSingletonScope();
	bind<ICardService>(TYPES.CardService).to(CardService).inSingletonScope();
	
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap() {
  // const app = new App(new ShopController);
  // await app.init();
  const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

bootstrap();