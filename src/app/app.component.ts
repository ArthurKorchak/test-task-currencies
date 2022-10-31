import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="response" [response]="response"></app-header>    
  `,
  styles: []
})
export class AppComponent {

  response: any;

  constructor(private http: HttpClient) {

    this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .subscribe(resp => {
        console.log(resp);
        this.response = resp;
    });
  };
};
