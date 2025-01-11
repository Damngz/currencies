import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Currency } from '../models/currency.model';
import { CurrencyService } from '../services/currency.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChartComponent } from '../chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-currencies',
  imports: [ CommonModule, FormsModule, NavbarComponent, ChartComponent, NgApexchartsModule ],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.css'
})
export class CurrenciesComponent implements OnInit {
  currencies: Currency[] = [];
  newCurrency: Currency = { id: 0, name: '', rate: 0 };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    console.log('inicio el currencies')
    this.currencyService.getCurrencies().subscribe(data => this.currencies = data);
  }

  addCurrency(): void {
    this.currencyService.addCurrency({ ...this.newCurrency });
    this.newCurrency = { id: 0, name: '', rate: 0 };
  }

  updateCurrency(currency: Currency): void {
    this.currencyService.updateCurrency(currency);
  }

  deleteCurrency(id: number): void {
    this.currencyService.deleteCurrency(id);
  }
}
