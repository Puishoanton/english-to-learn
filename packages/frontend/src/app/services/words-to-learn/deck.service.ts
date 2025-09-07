import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ICreateDeck, IDeck, IEditDeck } from '../../models/words-to-learn';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { IPageResult } from '../../models/words-to-learn/page-result.interface';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private readonly httpClient = inject(HttpClient)
  public readonly authService = inject(AuthService)
  private readonly destroyRef = inject(DestroyRef);

  private readonly apiUrl = `${environment.apiBaseUrl}`
  public decks = signal<IDeck[]>([])

  constructor() {
    toObservable(this.authService.isLoggedIn).pipe(
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return this.getDecks()
        }
        this.decks.set([])
        return of([])
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  public getDeckById(id: string): Observable<IDeck> {
    return this.httpClient.get<IDeck>(`${this.apiUrl}/decks/${id}`);
  }

  public createDeck(createDeckDto: ICreateDeck) {
    return this.httpClient.post<IDeck>(
      `${this.apiUrl}/decks`,
      createDeckDto
    )
      .pipe(tap(() => this.getDecks().subscribe()))
  }

  public removeDeck(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/decks/${id}`).pipe(tap(() => this.getDecks().subscribe()))
  }

  public getDecks(search: string = ''): Observable<IPageResult<IDeck[]>> {
    return this.httpClient.get<IPageResult<IDeck[]>>(`${this.apiUrl}/decks?search=${search}&page=1&skip=100`).pipe(
      tap((res) => {
        this.decks.set(res.items)
      })
    )
  }

  public editDeck(deckId: string, editDeckDto: IEditDeck) {
    return this.httpClient.put<void>(`${this.apiUrl}/decks/${deckId}`, editDeckDto)
      .pipe(tap(() => this.getDecks(deckId).subscribe()))
  }
}
