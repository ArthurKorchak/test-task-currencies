import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Currency } from '../../models/currency';

@Component({
  selector: 'app-exchange',
  template: `
    <form [formGroup]="exchangeForm" (ngSubmit)="onSubmit()">
      <div class="half-of-form">
        <p class="title">From</p>
        <div class="input-wrapper">
          <select name="firstSelect" formControlName="firstSelect">
            <option *ngFor="let item of currencies" [value]="item">{{item}}</option>
          </select>
          <input
            type="number"
            name="firstInput"
            placeholder="0"
            formControlName="firstInput"
            required
          />
        </div>
      </div>
      <p class="arrow-box">
        <span class="arrow">➤</span>
      </p>
      <div class="half-of-form">
        <p class="title">To</p>
        <div class="input-wrapper">
          <select name="secondSelect" formControlName="secondSelect">
            <option *ngFor="let item of currencies" [value]="item">{{item}}</option>
          </select>
          <input
            type="number"
            name="secondInput"
            placeholder="0"
            formControlName="secondInput"
            required
          />
        </div>
      </div>
      <button type="submit" [disabled]="!exchangeForm.valid">
        Buy now
      </button>
    </form>
  `,
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit{

  @Input() currenciesList: Currency[] = [];

  public exchangeForm: FormGroup;

  public currencies = ['UAH', 'USD', 'EUR'];
  private prevValuesCache = {
    firstSelect: 'UAH',
    secondSelect: 'USD'
  };
  private isRerenderNeed = true;

  constructor() {
    this.exchangeForm  = new FormGroup({
      firstSelect: new FormControl(this.prevValuesCache.firstSelect),
      secondSelect: new FormControl(this.prevValuesCache.secondSelect),
      firstInput: new FormControl(''),
      secondInput: new FormControl('')
  });
  }

  ngOnInit(): void {
    const firstSelect = this.exchangeForm.controls['firstSelect'];
    const secondSelect = this.exchangeForm.controls['secondSelect'];
    const firstInput = this.exchangeForm.controls['firstInput'];
    const secondInput = this.exchangeForm.controls['secondInput'];
    
    firstSelect.valueChanges.subscribe((): void => {
      this.handleSelect(firstSelect, secondSelect, firstInput, secondInput, 'firstSelect');
    });
    secondSelect.valueChanges.subscribe((): void => {
      this.handleSelect(firstSelect, secondSelect, firstInput, secondInput, 'secondSelect');
    });
    firstInput.valueChanges.subscribe((): void => {
      if (this.isRerenderNeed) {
        this.isRerenderNeed = false;
        this.calculateCurrencies(firstInput, secondInput, 'second');
      } else {
        this.isRerenderNeed = true;
      }      
    });
    secondInput.valueChanges.subscribe((): void => {
      if (this.isRerenderNeed) {
        this.isRerenderNeed = false;
        this.calculateCurrencies(firstInput, secondInput, 'first');
      } else {
        this.isRerenderNeed = true;
      }
    });
  };  

  private handleSelect(firstSelect: AbstractControl, secondSelect: AbstractControl,
    firstInput: AbstractControl, secondInput: AbstractControl, target: string): void {
    const firstSelectValue = firstSelect.value;
    const secondSelectValue = secondSelect.value;
    
    this.isRerenderNeed = false;
    if (target === 'firstSelect') {
      if (firstSelectValue === secondSelectValue) {
        secondSelect.setValue(this.prevValuesCache.firstSelect);
        this.prevValuesCache.secondSelect = this.prevValuesCache.firstSelect;
        this.prevValuesCache.firstSelect = firstSelectValue;
        this.calculateCurrencies(firstInput, secondInput, 'second');
      } else {
        this.prevValuesCache.firstSelect = firstSelectValue;
        this.calculateCurrencies(firstInput, secondInput, 'first');
      };
    } else if (target === 'secondSelect') {
      if (firstSelectValue === secondSelectValue) {
        firstSelect.setValue(this.prevValuesCache.secondSelect);
        this.prevValuesCache.firstSelect = this.prevValuesCache.secondSelect;
        this.prevValuesCache.secondSelect = secondSelectValue;
        this.calculateCurrencies(firstInput, secondInput, 'first');
      } else {
        this.prevValuesCache.secondSelect = secondSelectValue;
        this.calculateCurrencies(firstInput, secondInput, 'second');
      };
    };
  };

  private calculateCurrencies(firstInput: AbstractControl, secondInput: AbstractControl, target: string): void {
    const firstCurrency = this.currenciesList.find((elem: Currency) => elem.ccy === this.prevValuesCache.firstSelect);
    const secondCurrency = this.currenciesList.find((elem: Currency) => elem.ccy === this.prevValuesCache.secondSelect);

    if (target === 'first') {
      const value = secondInput.value;
      const crossRange =
        +(secondCurrency?.sale ? secondCurrency.sale : 1) /
        +(firstCurrency?.buy ? firstCurrency.buy : 1);
      firstInput.setValue(Math.round(value * crossRange * 100) / 100);
    } else if (target === 'second') {
      const value = firstInput.value;
      const crossRange =
        +(firstCurrency?.buy ? firstCurrency.buy : 1) /
        +(secondCurrency?.sale ? secondCurrency.sale : 1);
      secondInput.setValue(Math.round(value * crossRange * 100) / 100);
    }
  };

  public onSubmit(): void {
    const value = this.exchangeForm.value;
    alert(`pay: ${value.firstInput ? value.firstInput : '0'} ${value.firstSelect} | get: ${value.secondInput ? value.secondInput : '0'} ${value.secondSelect}`);
  };
};
