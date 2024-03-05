import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../template/footer/footer.component';

declare var utag: any;
declare var window: any;

@Component({
  selector: 'app-start-questionnaire',
  standalone: true,
  imports: [
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './start-questionnaire.component.html',
  styleUrl: './start-questionnaire.component.scss'
})
export class StartQuestionnaireComponent implements OnInit {


  ngOnInit(): void {
    let utag_data = environment.utagInfo.home;
        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);
  }
}
