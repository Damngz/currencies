import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencies: Currency[] = [
    { id: 1, name: 'USD', rate: 1 },
    { id: 2, name: 'EUR', rate: 0.9 },
  ];
  private currenciesSubject = new BehaviorSubject<Currency[]>(this.currencies);

  getCurrencies(): Observable<Currency[]> {
    return this.currenciesSubject.asObservable();
  }

  addCurrency(currency: Currency): void {
    console.log(currency);
    currency.id = this.currencies.length + 1;
    this.currencies.push(currency);
    this.currenciesSubject.next(this.currencies);
  }

  updateCurrency(updatedCurrency: Currency): void {
    const index = this.currencies.findIndex(c => c.id === updatedCurrency.id);
    if (index !== -1) {
      this.currencies[index] = updatedCurrency;
      this.currenciesSubject.next(this.currencies);
    }
  }

  deleteCurrency(id: number): void {
    this.currencies = this.currencies.filter(c => c.id !== id);
    this.currenciesSubject.next(this.currencies);
  }
}
