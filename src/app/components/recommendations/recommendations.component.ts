import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../template/footer/footer.component';

declare var utag: any;
declare var window: any;

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent implements OnInit {

  clientName: string | null = '';
  recommendedProducts: Array<any> = [];

  constructor(private router: Router){}

  ngOnInit(): void {
    let utag_data = environment.utagInfo.home;
        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);

    this.clientName = sessionStorage.getItem('clientName');

    let products = sessionStorage.getItem('recommendedProducts');
    if(products)
      this.recommendedProducts = JSON.parse(products);
  }

  startQuestionnaire(){
    this.router.navigate(['start-questionnaire']);
  }
}
