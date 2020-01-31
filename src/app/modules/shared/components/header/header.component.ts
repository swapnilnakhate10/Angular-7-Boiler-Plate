import { Component, OnInit } from '@angular/core';

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
    this.menulist = this.userMenu;
  }

  ngOnInit() {
    this.menulist = [
      {
					"text": "About Us",
					"url": "/about",
					"icon": "fa fa-user"
				},
				{
					"text": "Contact Us",
					"url": "/contact",
					"icon": "fa fa-users"
				}
    ]
  }

}
