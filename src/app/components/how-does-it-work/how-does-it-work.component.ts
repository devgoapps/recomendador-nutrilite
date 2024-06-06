import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

declare var utag: any;
declare var window: any;

@Component({
  selector: 'app-how-does-it-work',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './how-does-it-work.component.html',
  styleUrl: './how-does-it-work.component.scss'
})
export class HowDoesItWorkComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {

    const icon = document.getElementById('ada-entry');

    if (icon) {
      (icon as HTMLElement).style.display = 'none';
    } else {
      console.error('Elemento con id "ada-entry" no encontrado.');
    }
    
    let utag_data = environment.utagInfo.howDoesItWork;
        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    console.log(window.utag_data);
    setTimeout(() => {
      utag.view(window.utag_data);
    }, 500);
  }

  startQuestionnaire(){
    this.router.navigate(['questionnaire']);
  }

  back(){
    this.router.navigate(['start-questionnaire']);
  }
}
