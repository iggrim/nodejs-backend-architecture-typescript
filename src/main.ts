import { App } from "./app";
import { ShopController } from './shop/shop.controller'

async function bootstrap() {
  const app = new App(new ShopController);
  await app.init();
}

bootstrap();