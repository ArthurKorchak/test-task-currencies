import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="currenciesList.length" [currenciesList]="currenciesList"></app-header>
    <main>
    <app-exchange *ngIf="currenciesList.length" [currenciesList]="currenciesList"></app-exchange>
    </main>
  `
})
export class AppComponent implements OnInit {

  public currenciesList: Currency[] = [];

  constructor(private currencyService: CurrencyService) { };

  ngOnInit(): void {
    this.currencyService.getCurrencies()
      .subscribe(resp => {
        this.currenciesList = resp;
      });
  };
};
