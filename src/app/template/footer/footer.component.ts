import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  code: string | null = '';

  ngOnInit(){
    this.code = sessionStorage.getItem('çode');
  }
}
