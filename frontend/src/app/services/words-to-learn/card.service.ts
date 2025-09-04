import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ICard, ICreateCard, IEditCard } from '../../models/words-to-learn';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}`
  public cards = signal<ICard[]>([])

  public getCards(deckId: string): Observable<ICard[]> {
    return this.httpClient.get<ICard[]>(`${this.apiUrl}/decks/${deckId}/cards`).pipe(
      tap((res) => {
        this.cards.set(res)
      })
    )
  }
  public getCardById(cardId: string, deckId: string): Observable<ICard> {
    return this.httpClient.get<ICard>(`${this.apiUrl}/decks/${deckId}/cards/${cardId}`)
  }
  public createCard(createCardDto: ICreateCard, deckId: string) {
    return this.httpClient.post<ICard>(
      `${this.apiUrl}/decks/${deckId}/cards`,
      createCardDto
    )
      .pipe(tap(() => this.getCards(deckId).subscribe()))
  }
  public editCard(cardId: string, editCardDto: IEditCard, deckId: string) {
    return this.httpClient.put<void>(`${this.apiUrl}/decks/${deckId}/cards/${cardId}`, editCardDto)
      .pipe(tap(() => this.getCards(deckId).subscribe()))
  }
  public deleteCard(cardId: string, deckId: string) {
    return this.httpClient.delete<void>(`${this.apiUrl}/decks/${deckId}/cards/${cardId}`)
      .pipe(tap(() => this.getCards(deckId).subscribe()))
  }

  public changeProgress(cardId: string, changeValue: 'Decrease' | 'Increase', deckId: string) {
    console.log(cardId, changeValue);
    return this.httpClient.patch<void>(`${this.apiUrl}/decks/${deckId}/cards/${cardId}/progress`, { progress: changeValue })
  }
}
