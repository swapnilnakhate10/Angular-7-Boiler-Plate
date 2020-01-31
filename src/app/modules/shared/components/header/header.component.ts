import { Component, OnInit } from '@angular/core';
import * as RolesMenu from "../../../../data/role-menu.json";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userMenu:any;
  menulist:any;
  constructor() { 
    this.menulist = this.userMenu;
  }

  ngOnInit() {
    this.userMenu = (<any>RolesMenu).common;
    this.menulist = this.userMenu;
    
  }

}
