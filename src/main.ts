import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types";
import { App } from "./app";
import { ILogger } from "./components/logger/logger.interface";
import { LoggerService } from "./components/logger/logger.service";
import { IExeptionFilter } from "./components/errors/exeption.filter.interface";
import { ExeptionFilter } from "./components/errors/exeption.filter";
import { ProductsController } from "./components/products/products.controller";
import { IProductsController } from "./components/products/products.controller.interface";
import { ProductsService } from "./components/products/products.service";
import { IProductsService } from "./components/products/products.service.interface";
import { ProductsRepository } from "./components/products/products.repository";
import { IProductsRepository } from "./components/products/products.repository.interface";
import { CartRepository } from "./components/cart/cart.repository";
import { ICartRepository } from "./components/cart/cart.repository.interface";
import { ICartController } from "./components/cart/cart.controller.interface";
import { CartController } from "./components/cart/cart.controller";
import { CartService } from "./components/cart/cart.service";
import { ICartService } from "./components/cart/cart.service.interface";
import { IUserService } from "./components/users/users.service.interface";
import { UserService } from "./components/users/users.service";
import { IUsersRepository } from "./components/users/users.repository.interface";
import { UsersRepository } from "./components/users/users.repository";
import { IOrderController } from './components/orders/order.controller.interface';
import { OrderController} from './components/orders/order.controller';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IProductsController>(TYPES.ProductsController).to(ProductsController);
  bind<IProductsService>(TYPES.ProductsService).to(ProductsService);
  bind<IProductsRepository>(TYPES.ProductsRepository).to(ProductsRepository).inSingletonScope();
  bind<ICartController>(TYPES.CartController).to(CartController);
  bind<ICartRepository>(TYPES.CartRepository).to(CartRepository).inSingletonScope();
  bind<ICartService>(TYPES.CartService).to(CartService);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
  bind<IOrderController>(TYPES.OrderController).to(OrderController);
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
