import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { ICreateDeck, IDeck } from '../../models/words-to-learn';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

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
    return this.httpClient.delete<void>(`${this.apiUrl}/decks/${id}`)
  }

  public getDecks(search?: string): Observable<IDeck[]> {
    return this.httpClient.get<IDeck[]>(`${this.apiUrl}/decks`).pipe(
      tap((res) => {
        this.decks.set(res)
      })
    )
  }
}
