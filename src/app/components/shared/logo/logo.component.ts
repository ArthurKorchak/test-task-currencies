import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <p class="logo">
        Turbo<span class="logo-part-two">Exchange</span> <span>🤑</span>
      </p>
  `,
  styleUrls: ['./logo.component.css']
})
export class LogoComponent { };
