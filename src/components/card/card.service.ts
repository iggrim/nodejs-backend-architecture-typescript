import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ICardService } from "./card.service.interface";
import { CardDto } from './card.dto';
import { CardItem } from "./card.entity";
import { CardRepository} from './card.repository'


@injectable()
export class CardService implements ICardService{
  constructor(
    @inject(TYPES.CardRepository) private cardRepository: CardRepository
  ){ }

  // Деструктурирующее присваивание. Разбор объекта ProductDto
  async createCardtItem({title, price, img }: CardDto): Promise<CardItem>{
    const newCardItem = new CardItem(title, price, img);
    await this.cardRepository.add(newCardItem);

    return newCardItem; //  а нужно ли?
  }
}