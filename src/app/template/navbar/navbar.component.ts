import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

    @Output() public isOpenSidebar = new EventEmitter<any>();
    @Input() public isOpen: boolean = false;

    public toggleDropdown: any = null;
    public isOpenSubMenu: boolean = false;

    constructor() { }

    ngOnInit(): void {
        let dropdownEl = $('#toggleDropdown')[0]; 
        this.toggleDropdown = new bootstrap.Dropdown(dropdownEl);
    }

    toggle(){
        this.isOpen = !this.isOpen;
        this.isOpenSidebar.next(this.isOpen);
    }


    openSubMenu2(){
        this.toggleDropdown.show();
    }

    closeSubMenu2(){
        this.toggleDropdown.hide();
    }

}
