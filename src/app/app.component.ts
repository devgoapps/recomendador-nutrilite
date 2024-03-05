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

    window.utag_data.site_webProperty_mod = hostname + ' | ecommerce';
    window.utag_data.site_country = code;
    window.utag_data.site_currencyCode = this.getCurrencyCode(code);
  }

  getCurrencyCode(code: string) {
    if (code == 'mx') return 'mxn';
    else if (code == 'gt') return 'gtq';
    else if (code == 'sv') return 'svc';
    else if (code == 'hn') return 'hnl';
    else if (code == 'pa') return 'pab';
    else if (code == 'cr') return 'crc';
    else if (code == 'ar') return 'ars';
    else if (code == 'cl') return 'clp';
    else if (code == 'uy') return 'uyu';
    else if (code == 'co') return 'cop';
    else if (code == 've') return 'vef';
    else return '';
  }
}
