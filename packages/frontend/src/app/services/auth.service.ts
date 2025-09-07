import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IGoogleLogin } from '../models/google/google-login.interface';
import { catchError, Observable, tap } from 'rxjs';
import { IAuthResponse } from '../models/auth/auth-response.interface';
import { ILogoutResponse } from '../models/auth/logout-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}`;
  public isLoggedIn = signal<boolean | undefined>(undefined);

  public googleLogin(googleLoginDto: IGoogleLogin): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/google-login`, googleLoginDto).pipe(
      tap(() => {
        this.getMe().subscribe();
      })
    );
  }

  public logout(): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.isLoggedIn.set(false);
      })
    );
  }

  public refreshToken(): Observable<ILogoutResponse> {
    return this.httpClient.post<ILogoutResponse>(`${this.apiUrl}/auth/refresh-token`, {}).pipe(
      tap(() => {
        this.getMe().subscribe();
      }),
      catchError(() => {
        this.isLoggedIn.set(false);
        return []
      })
    );
  }

  public getMe(): Observable<IAuthResponse> {
    return this.httpClient.get<IAuthResponse>(`${this.apiUrl}/auth/get-me`).pipe(
      tap(
        () => {
          this.isLoggedIn.set(true)
        }
      ),
      catchError(() => {
        this.isLoggedIn.set(false);
        return [];
      })
    )
  }
}
