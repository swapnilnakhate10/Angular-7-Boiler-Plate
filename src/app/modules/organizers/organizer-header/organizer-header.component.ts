import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../shared/services/storage.service';
import { Router } from '@angular/router';
import * as RolesMenu from "../../../data/role-menu.json";

@Component({
  selector: 'app-organizer-header',
  templateUrl: './organizer-header.component.html',
  styleUrls: ['./organizer-header.component.scss']
})
export class OrganizerHeaderComponent implements OnInit {

  userMenu:any;
  organiserMenu:any;
  menulist:any;

  constructor(private router: Router) { 
    this.menulist = this.organiserMenu;
  }

  ngOnInit() {
    this.organiserMenu = (<any>RolesMenu).organizer;
    this.menulist = this.organiserMenu;    
  }

  logout() {
    StorageService.removeAll();
    this.router.navigateByUrl('/');
  }

}
