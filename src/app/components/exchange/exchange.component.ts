import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-exchange',
  template: `
    <form>
      <div class="half-of-form">
        <p class="title">From</p>
        <div class="input-wrapper">
          <select name="firstSelect" [(ngModel)]="firstSelect" (input)="handleSelect($event)">
            <option *ngFor="let item of currencies" [value]="item">{{item}}</option>
          </select>
          <input
            type="number"
            name="firstInput"
            placeholder="0"
            [(ngModel)]="firstValue"
            (input)="handleInput($event)"
          />
        </div>
      </div>
      <p class="arrow-box">
        <span class="arrow">➤</span>
      </p>
      <div class="half-of-form">
        <p class="title">To</p>
        <div class="input-wrapper">
          <select name="secondSelect" [(ngModel)]="secondSelect" (input)="handleSelect($event)">
            <option *ngFor="let item of currencies" [value]="item">{{item}}</option>
          </select>
          <input
            type="number"
            name="secondInput"
            placeholder="0"
            [(ngModel)]="secondValue"
            (input)="handleInput($event)"
          />
        </div>
      </div>
      <a href="https://privatbank.ua/map" target="_blank" rel="noreferrer">
        Where to buy
      </a>
    </form>
  `,
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  @Input() response: any;

  currencies = ['UAH', 'USD', 'EUR']
  firstSelect = 'UAH';
  secondSelect = 'USD';
  firstValue = NaN;
  secondValue = NaN;

  constructor() { };

  calculateCurrencies(value: number, target: string): void {
    const firstCurrency = this.response.find((elem: any) => elem.ccy === this.firstSelect);
    const secondCurrency = this.response.find((elem: any) => elem.ccy === this.secondSelect);

    if (target === 'first') {
      const crossRange =
        (secondCurrency?.sale ? secondCurrency.sale : 1) /
        (firstCurrency?.buy ? firstCurrency.buy : 1);
      this.firstValue = Math.round(value * crossRange * 100) / 100;
    } else if (target === 'second') {
      const crossRange =
        (firstCurrency?.buy ? firstCurrency.buy : 1) /
        (secondCurrency?.sale ? secondCurrency.sale : 1);
      this.secondValue = Math.round(value * crossRange * 100) / 100;
    }
  };

  handleSelect(ev: Event): void {
    const target = ev.target as HTMLTextAreaElement;
    if (target.name === 'firstSelect') {
      if (this.secondSelect === target.value) {
        const buff = this.firstSelect;
        this.firstSelect = this.secondSelect;
        this.secondSelect = buff;
        this.calculateCurrencies(this.firstValue, 'second');
      } else {
        this.firstSelect = target.value;
        this.calculateCurrencies(this.secondValue, 'first');
      };
    } else if (target.name === 'secondSelect') {
      if (this.firstSelect === target.value) {
        const buff = this.firstSelect;
        this.firstSelect = this.secondSelect;
        this.secondSelect = buff;
        this.calculateCurrencies(this.secondValue, 'first');
      } else {
        this.secondSelect = target.value;
        this.calculateCurrencies(this.firstValue, 'second');
      };
    };
  };


  handleInput(ev: Event): void {
    const target = ev.target as HTMLTextAreaElement;
    if (target.name === 'firstInput') {
      this.calculateCurrencies(this.firstValue, 'second');
    } else if (target.name === 'secondInput') {
      this.calculateCurrencies(this.secondValue, 'first');
    };
  };

  ngOnInit(): void {
  };
};
