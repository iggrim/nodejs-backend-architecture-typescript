import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { BaseController } from '../common/base.controller';
import { ICardController } from './card.controller.interface';
import { ProductsRepository} from '../products/products.repository';
import { CardRepository } from './card.repository';
import { CardService } from './card.service';
import 'reflect-metadata';


@injectable()
export class CardController extends BaseController implements ICardController {
  /**
  Напоминание.
  В конструкторе ключевое слово super() используется как функция, вызывающая 
  родительский конструктор. Её необходимо вызвать до первого обращения к ключевому 
  слову this в теле конструктора. Ключевое слово super также может быть использовано 
  для вызова функций родительского объекта.
   */
	constructor(
    @inject(TYPES.ProductsRepository) private productsRepository: ProductsRepository,
    @inject(TYPES.CardService) private cardService: CardService,
    @inject(TYPES.CardRepository) private cardRepository: CardRepository,
  ) {
		super();
		this.bindRoutes([
      { path: '/products-card', method: 'get', func: this.getCard},
      { path: '/products-card/add', method: 'post', func: this.addToCard}, 
      { path: '/products-card/remove/:id', method: 'delete', func: this.deleteFromCard} 
		])
	}

  async addToCard(req: Request, res: Response, next: NextFunction){
    
    const product = await this.productsRepository.getById(req.body.id);
    
    //console.log('---product ', product);

    if(product)
      await this.cardService.createCardtItem(product)
      //await this.cardRepository.add(product);  

    res.redirect('/products-card')
  }
  

  async getCard(req: Request, res: Response, next: NextFunction){
    const card = await this.cardRepository.fetchItems()

    console.log('---card ', card);
    
    res.render('products-card', {
      title_1: 'Корзина',
      isCarad: true,
      card,
    })
  }

  async deleteFromCard(req: Request, res: Response, next: NextFunction){
    const card = await this.cardRepository.remove(req.params.id)
    res.status(200).json(card)
  }


}