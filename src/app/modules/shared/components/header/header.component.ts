import { Component, OnInit } from '@angular/core';
import * as RolesMenu from './role-menu.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userMenu:any;
  organiserMenu:any;
  menulist:any;
  constructor() { 
    this.userMenu = (<any>RolesMenu).user;
    this.organiserMenu = (<any>RolesMenu).organizer;
    this.menulist = this.userMenu;
  }

  ngOnInit() {
  }

}
