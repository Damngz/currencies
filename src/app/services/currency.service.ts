import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Currency, CurrencyFavorites } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currencies`);
  }

  getUserFavorites(userId: number): Observable<CurrencyFavorites[]> {
    return this.http.get<CurrencyFavorites[]>(`${this.baseUrl}/favorites/user/${userId}`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${email}`);
  }
}
