import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Currency, CurrencyFavorites } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'https://ddt9c6g18h.execute-api.us-east-1.amazonaws.com/v1';

  constructor(private http: HttpClient) {}

  token = sessionStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currencies`, { headers: this.headers });
  }

  getUserFavorites(userId: number): Observable<CurrencyFavorites[]> {
    return this.http.get<CurrencyFavorites[]>(`${this.baseUrl}/favorites/user/${userId}`, { headers: this.headers });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${email}`, { headers: this.headers });
  }
}
