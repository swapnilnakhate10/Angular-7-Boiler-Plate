import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../shared/services/storage.service';
import { Router } from '@angular/router';
import * as RolesMenu from "../../../data/role-menu.json";

@Component({
  selector: 'app-judge-header',
  templateUrl: './judge-header.component.html',
  styleUrls: ['./judge-header.component.scss']
})
export class JudgeHeaderComponent implements OnInit {

  judgeMenu:any;
  menulist:any;

  constructor(private router: Router) { 
    this.menulist = this.judgeMenu;
  }

  ngOnInit() {
    this.judgeMenu = (<any>RolesMenu).judges;
    this.menulist = this.judgeMenu;    
  }

  logout() {
    StorageService.removeAll();
    this.router.navigateByUrl('/');
  }
}
