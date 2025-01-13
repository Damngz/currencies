import { Component } from '@angular/core';
import { Currency } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-explore',
  imports: [ CommonModule, NavbarComponent ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  currencies: Currency[] = [];

  constructor(private currencyService: CurrencyService, private http: HttpClient) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies.map((currency) => {
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

  }
}
