import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICard, ICreateCard, IEditCard } from '../../models/words-to-learn';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: ICard[] = [
    {
      id: '1',
      word: 'example',
      word_context: 'This is an example of a sentence using the word.',
      translation: 'приклад',
      translation_context: 'використання слова в реченні',
      createdAt: new Date(),
      updatedAt: new Date(),
      deckId: '1'
    },
    {
      id: '2',
      word: 'test',
      word_context: 'We need to test this hypothesis.',
      translation: 'тест',
      translation_context: 'перевірка гіпотези',
      createdAt: new Date(),
      updatedAt: new Date(),
      deckId: '1'
    },
    {
      id: '3',
      word: '3 test 3',
      word_context: '3 We need to test this hypothesis. 3',
      translation: '3 тест 3',
      translation_context: '3 перевірка гіпотези 3',
      createdAt: new Date(),
      updatedAt: new Date(),
      deckId: '1'
    }
  ]
  private readonly httpClient = inject(HttpClient);

  public getCards(deckId: string): ICard[] {
    return this.cards.filter(c => c.deckId === deckId);;
  }
  public getCardById(id: string): ICard | undefined {
    return this.cards.find(card => card.id === id);
  }
  public createCard(createCardDto: ICreateCard) {
    console.log(createCardDto);
    return { status: 200, message: 'Created' }
  }
  public editCard(cardId: string, editCardDto: IEditCard) {
    console.log(editCardDto);
    return { status: 200, message: 'Edited' }
  }
  public deleteCard(cardId: string) {
    console.log(cardId);
    return { status: 200, message: 'Deleted' }
  }

  public changeProgress(cardId: string, changeValue: 'decrease' | 'increase') {
    console.log(cardId, changeValue);
    return { status: 200, }
  }
}
