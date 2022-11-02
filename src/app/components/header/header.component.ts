import { Component, Input} from '@angular/core';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <app-logo></app-logo>
      <div class='currencies-box'>
        <app-currency-stats 
        [ccy]="currenciesList[0].ccy" 
        [base_ccy]="currenciesList[0].base_ccy" 
        [buy]="currenciesList[0].buy" 
        [sale]="currenciesList[0].sale"
        >
        </app-currency-stats>
        <app-currency-stats 
        [ccy]="currenciesList[1].ccy" 
        [base_ccy]="currenciesList[1].base_ccy" 
        [buy]="currenciesList[1].buy" 
        [sale]="currenciesList[1].sale"
        >
        </app-currency-stats>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  @Input() currenciesList: Currency[] = [];
};
