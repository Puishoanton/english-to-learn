import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICard } from '../../models/words-to-learn';

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
    }
  ]
  private readonly httpClient = inject(HttpClient);

  public getCards(deckId: string): ICard[] {
    return this.cards;
  }
  public getCardById(id: string): ICard | undefined {
    return this.cards.find(card => card.id === id);
  }
  public addCard(card: ICard) {
    this.cards.push(card);
  }
  public removeCard(id: string) {
    this.cards = this.cards.filter(card => card.id !== id);
  }
}
