import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <app-header *ngIf="response" [response]="response"></app-header>
    <main>
    <app-exchange *ngIf="response" [response]="response"></app-exchange>
    </main>
  `,
  styles: []
})
export class AppComponent {

  response: any;

  constructor(private http: HttpClient) {
  };

  ngOnInit() {
    this.http.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .subscribe(resp => {
        this.response = resp;
    });
  };
};
