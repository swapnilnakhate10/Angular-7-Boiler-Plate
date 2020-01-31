import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../shared/services/storage.service';
import { Router } from '@angular/router';
import * as RolesMenu from "../../../data/role-menu.json";

@Component({
  selector: 'app-users-header',
  templateUrl: './users-header.component.html',
  styleUrls: ['./users-header.component.scss']
})
export class UsersHeaderComponent implements OnInit {

  constructor(private router: Router) {
    this.menulist = this.userMenu;
   }

  userMenu:any;
  menulist:any;

  ngOnInit() {
    this.userMenu = (<any>RolesMenu).user;
    this.menulist = this.userMenu;
    
  }

  logout() {
    StorageService.removeAll();
    this.router.navigateByUrl('/');
  }

}
