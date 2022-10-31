import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-stats',
  template: `
    <div class='currency'>
      <p>
        {{ccy}} / {{base_ccy}}
      </p>
      <div>
        <p>Buy: {{buy}}</p>
        <p>Sale: {{sale}}</p>
      </div>
    </div>
  `,
  styleUrls: ['./currency-stats.component.css']
})
export class CurrencyStatsComponent implements OnInit {

  @Input() ccy = '';
  @Input() base_ccy = '';
  @Input() buy = '';
  @Input() sale = '';

  ngOnInit(): void {
    this.buy = Number(this.buy).toFixed(2);
    this.sale = Number(this.sale).toFixed(2);
  };
};