import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IGoogleLogin } from '../models/google/google-login.interface';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../models/auth/auth-response.interface';
import { ILogoutResponse } from '../models/auth/logout-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}`;

  public googleLogin(googleLoginDto: IGoogleLogin): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/google-login`, googleLoginDto)
  }

  public logout(): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/logout`, {})
  }

  public refreshToken(): Observable<ILogoutResponse> {
    return this.httpClient.post<ILogoutResponse>(`${this.apiUrl}/auth/refresh-token`, {})
  }
}
