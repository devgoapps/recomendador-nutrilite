import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './template/navbar/navbar.component';

declare var window: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  ngOnInit(): void {
    let hostname = window.location.hostname;
    let hostSplit = hostname.split('.');
    let code = hostSplit[hostSplit.length - 1];

    sessionStorage.setItem('code', code);

    window.utag_data.site_webProperty_mod = hostname + ' | ecommerce';
    window.utag_data.site_country = code;
    window.utag_data.site_currencyCode = this.getCurrencyCode(code);
  }

  getCurrencyCode(code: string) {
    if (code == 'br') {return 'brl';}
    else {return '';}
  }
}
