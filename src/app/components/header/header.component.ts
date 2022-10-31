import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <app-logo></app-logo>
      <div class='currencies-box'>
        <app-currency-stats 
        [ccy]="response[0].ccy" 
        [base_ccy]="response[0].base_ccy" 
        [buy]="response[0].buy" 
        [sale]="response[0].sale"
        >
        </app-currency-stats>
        <app-currency-stats 
        [ccy]="response[1].ccy" 
        [base_ccy]="response[1].base_ccy" 
        [buy]="response[1].buy" 
        [sale]="response[1].sale"
        >
        </app-currency-stats>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() response: any;

  ngOnInit(): void {
  };
};
