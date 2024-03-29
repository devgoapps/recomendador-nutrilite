import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../template/footer/footer.component';

declare var utag: any;
declare var window: any;

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent implements OnInit {

  countries: Array<any> = [
    {
        img: 'assets/img/Compras/Argentina.png',
        link: 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdsList&IC=4&C=PO&line=P&NavM=N&utm_source=site&utm_medium=home&utm_campaign=ar_es&utm_content=cta_compra&utm_term=boton_comprar'
    },    
    {
        img: 'assets/img/Compras/Honduras.png',
        link: 'https://www.amway.com.hn/Store/Catalogue.aspx?show=Top&line=C&utm_source=site&utm_medium=home&utm_campaign=hn_es&utm_content=cta_compra&utm_term=boton_comprar'
    },
    {
        img: 'assets/img/Compras/Chile.png',
        link: 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdsList&IC=1&C=CV&line=C&NavM=N&utm_source=site&utm_medium=home&utm_campaign=cl_es&utm_content=cta_compra&utm_term=boton_comprar'
    },  
    {
        img: 'assets/img/Compras/Mexico.png',
        link: 'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdsList&IC=5&C=KQ&line=K&NavM=N&utm_source=site&utm_medium=home&utm_campaign=mx_es&utm_content=cta_compra&utm_term=boton_comprar'
    },
    {
        img: 'assets/img/Compras/Colombia.png',
        link: 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdsList&IC=5&C=CA&line=C&NavM=N&utm_source=site&utm_medium=home&utm_campaign=co_es&utm_content=cta_compra&utm_term=boton_comprar'
    },    
    {
        img: 'assets/img/Compras/Panama.png',
        link: 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdsList&IC=5&C=BO&line=B&NavM=N&utm_source=site&utm_medium=home&utm_campaign=pa_es&utm_content=cta_compra&utm_term=boton_comprar'
    },
    {
        img: 'assets/img/Compras/CostaRica.png',
        link: 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdsList&IC=5&C=BQ&line=B&NavM=N&utm_source=site&utm_medium=home&utm_campaign=cr_es&utm_content=cta_compra&utm_term=boton_comprar'
    },    
    {
        img: 'assets/img/Compras/Uruguay.png',
        link: 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=2&C=FV&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es&utm_content=cta_compra&utm_term=boton_comprar'
    },
    {
        img: 'assets/img/Compras/ElSalvador.png',
        link: 'https://www.amway.com.sv/Store/Catalogue.aspx?show=Top&line=O&utm_source=site&utm_medium=home&utm_campaign=sv_es&utm_content=cta_compra&utm_term=boton_comprar'
    },    
    {
        img: 'assets/img/Compras/Venezuela.png',
        link: 'https://www.amway.com.ve/Store/Catalogue.aspx?show=Top&line=A&utm_source=site&utm_medium=home&utm_campaign=ve_es&utm_content=cta_compra&utm_term=boton_comprar'
    },
    {
        img: 'assets/img/Compras/Guatemala.png',
        link: 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdsList&IC=5&C=CU&line=C&NavM=N&utm_source=site&utm_medium=home&utm_campaign=gt_es&utm_content=cta_compra&utm_term=boton_comprar'
    }, 
    

   



  ]

  constructor() { }

  ngOnInit(): void {
    let utag_data = environment.utagInfo.countries;
        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);
  }

  openLink(link: string){
      window.open(link, '_blank');
  }
}
