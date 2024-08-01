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

    const icon = document.getElementById('ada-entry');

    if (icon) {
      (icon as HTMLElement).style.display = 'none';
    } else {
      console.error('Elemento con id "ada-entry" no encontrado.');
    }

    let utag_data = environment.utagInfo.startQuestionnaire;
        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    //console.log(window.utag_data);
    setTimeout(() => {
      utag.view(window.utag_data);
    }, 500);
  }
}
