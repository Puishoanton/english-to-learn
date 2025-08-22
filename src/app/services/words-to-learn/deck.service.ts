import { inject, Injectable } from '@angular/core';
import { ICard, ICreateDeck, IDeck } from '../../models/words-to-learn';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks: IDeck[] = [
    {
      id: '1',
      name: 'Basic English Vocabulary',
      ownerId: 'user123',
      createdAt: new Date(),
      updatedAt: new Date(),
      wordsCount: 2,
      description: 'A collection of basic English words and their meanings.',
    }
  ]
  private readonly httpClient = inject(HttpClient);

  public getDecks(search?: string) {
    console.log(search);
    return this.decks;
  }
  public getDeckById(id: string): IDeck | undefined {
    return this.decks.find(deck => deck.id === id);
  }
  public createDeck(createDeckDto: ICreateDeck) {
    console.log(createDeckDto);
    return { status: 200, message: 'Created' }
  }
  public removeDeck(id: string) {
    this.decks = this.decks.filter(deck => deck.id !== id);
  }
}
