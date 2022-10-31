import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';
import { CurrenciesComponent } from '../currencies/currencies.component';
import { LogoComponent } from '../shared/logo/logo.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderComponent,
    CurrenciesComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})
export class HeaderModule { }