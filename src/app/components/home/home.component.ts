import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../template/footer/footer.component';
import { Router, RouterModule } from '@angular/router';

declare var utag: any;
declare var window: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  startQuestionnaire(){
    this.router.navigate(['start-questionnaire']);
  }
}
