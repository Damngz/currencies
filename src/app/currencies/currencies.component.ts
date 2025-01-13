import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Currency } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartComponent } from '../chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currencies',
  imports: [ CommonModule, FormsModule, NavbarComponent, ChartComponent, NgApexchartsModule ],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent implements OnInit {
  favoriteCurrencies: Currency[] = [];
  selectedCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService, private http: HttpClient) {}

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('user');

    if (userEmail) {
      this.currencyService.getUserByEmail(userEmail).subscribe((user) => {
        const userId = user.user_id;

        this.currencyService.getUserFavorites(userId).subscribe((favorites) => {
          
          this.favoriteCurrencies = favorites.map((favorite) => {
            const { currency } = favorite;
            let dolarValue$;
            const request = this.http.get<any>(`https://mindicador.cl/api/${currency.key_id}`).toPromise();
            
            if (currency.dolar === 'Y') {
              dolarValue$ = this.http.get<any>(`https://mindicador.cl/api/dolar`).toPromise();
            }
            Promise.all([request, dolarValue$]).then(([requestData, dolarData]) => {

              if (currency.dolar === 'Y') {
                currency.price = requestData.serie[0].valor * dolarData.serie[0].valor;
              } else {
                currency.price = requestData.serie[0].valor;
              }

              currency.rate = requestData.serie[0].valor / requestData.serie[1].valor - 1;

              currency.series = requestData.serie.map((value: { fecha: string; valor: number; }) => value.valor);
            });

            return currency;
          });
        });
      });
    }
  }

  selectCurrency(name: string): void {
    this.selectedCurrency = name;
  }
}
