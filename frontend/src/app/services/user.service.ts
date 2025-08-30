import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IGoogleLogin } from '../models/google/google-login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}`;

  public googleLogin(googleLoginDto: IGoogleLogin) {
    return this.httpClient.post(`${this.apiUrl}/auth/google-login`, googleLoginDto);
  }
}
