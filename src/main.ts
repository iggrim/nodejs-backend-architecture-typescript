import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from "./app";
import { ShopController } from './shop/shop.controller';
import { IShopController } from './shop/shop.controller.interface';
import { ProductsService } from './products/products.service';
import { IProductsService } from './products/products.service.interface'
import { ProductsRepository } from './products/products.repository';
import { IProductsRepository} from './products/products.repository.interface';


export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<IShopController>(TYPES.ShopController).to(ShopController);
	bind<IProductsService>(TYPES.ProductsService).to(ProductsService);
	bind<IProductsRepository>(TYPES.ProductsRepository).to(ProductsRepository).inSingletonScope();
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