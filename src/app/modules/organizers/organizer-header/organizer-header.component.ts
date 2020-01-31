import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizer-header',
  templateUrl: './organizer-header.component.html',
  styleUrls: ['./organizer-header.component.scss']
})
export class OrganizerHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    StorageService.removeAll();
    this.router.navigateByUrl('/');
  }

}
