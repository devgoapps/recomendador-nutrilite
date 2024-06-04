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
    if (code == 'mx') return 'mxn';
    else if (code == 'gt') return 'gtq';  //guatemala
    else if (code == 'sv') return 'svc';  //el salvador
    else if (code == 'hn') return 'hnl';  //honduras
    else if (code == 'pa') return 'pab';  //panama
    else if (code == 'cr') return 'crc';  //costa rica
    else if (code == 'ar') return 'ars';  //argentina
    else if (code == 'cl') return 'clp';  //chile
    else if (code == 'uy') return 'uyu';  //uruguay
    else if (code == 'co') return 'cop';  //colombia
    else if (code == 've') return 'vef';  //venezuela
    else return '';
  }
}
