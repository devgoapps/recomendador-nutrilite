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
        img: 'assets/img/Compras/Argentina2.png',
        link: 'https://www.amway.com.ar/Store/Catalogue.aspx?show=Top&line=P&utm_source=recomendador&utm_medium=countries&utm_campaign=ar_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },     
    {
        img: 'assets/img/Compras/Colombia2.png',
        link: 'https://www.amway.com.co/Store/Catalogue.aspx?show=Top&line=C&utm_source=recomendador&utm_medium=countries&utm_campaign=co_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },    

    {
        img: 'assets/img/Compras/CostaRica2.png',
        link: 'https://www.amway.co.cr/Store/Catalogue.aspx?show=Top&line=B&utm_source=recomendador&utm_medium=countries&utm_campaign=cr_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },    
    {
        img: 'assets/img/Compras/Chile2.png',
        link: 'https://www.amway.cl/Store/Catalogue.aspx?show=Top&line=C&utm_source=recomendador&utm_medium=countries&utm_campaign=cl_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    }, 
    {
        img: 'assets/img/Compras/ElSalvador2.png',
        link: 'https://www.amway.com.sv/Store/Catalogue.aspx?show=Top&line=O&utm_source=recomendador&utm_medium=countries&utm_campaign=sv_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },    

    {
        img: 'assets/img/Compras/Guatemala2.png',
        link: 'https://www.amway.com.gt/Store/Catalogue.aspx?show=Top&line=C&utm_source=recomendador&utm_medium=countries&utm_campaign=gt_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    }
   



  ]

  countries2: Array<any> = [
   
    {
        img: 'assets/img/Compras/Honduras2.png',
        link: 'https://www.amway.com.hn/Store/Catalogue.aspx?show=Top&line=C&utm_source=recomendador&utm_medium=countries&utm_campaign=hn_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },    
    {
        img: 'assets/img/Compras/Mexico2.png',
        link: 'https://www.amway.com.mx/Store/Catalogue.aspx?show=Top&line=K&utm_source=recomendador&utm_medium=countries&utm_campaign=mx_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },     
    {
        img: 'assets/img/Compras/Panama2.png',
        link: 'https://www.amway.com.pa/Store/Catalogue.aspx?show=Top&line=B&utm_source=recomendador&utm_medium=countries&utm_campaign=pa_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },    
    {
        img: 'assets/img/Compras/Uruguay2.png',
        link: 'https://www.amway.com.uy/Store/Catalogue.aspx?show=Top&line=F&utm_source=recomendador&utm_medium=countries&utm_campaign=uy_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },    
    {
        img: 'assets/img/Compras/Venezuela2.png',
        link: 'https://www.amway.com.ve/Store/Catalogue.aspx?show=Top&line=A&utm_source=recomendador&utm_medium=countries&utm_campaign=ve_es_site_recomendador&utm_content=cta_comprar&utm_term=nutricion'
    },



  ]

  constructor() { }

  ngOnInit(): void {
    // let utag_data = environment.utagInfo.countries;
        
    // window.utag_data = Object.assign(window.utag_data, utag_data);
    // console.log(window.utag_data);
    // setTimeout(() => {
    //   utag.view(window.utag_data);
    // }, 500);
  }

  openLink(link: string){
      window.open(link, '_blank');
  }
}
