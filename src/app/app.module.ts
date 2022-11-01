import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { LogoComponent } from './components/shared/logo/logo.component';
import { CurrencyStatsComponent } from './components/shared/currency-stats/currency-stats.component';
import { ExchangeComponent } from './components/exchange/exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrenciesComponent,
    LogoComponent,
    CurrencyStatsComponent,
    ExchangeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }