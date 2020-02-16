import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { EventService } from './../../shared/services/event.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events = [];

  constructor(private router: Router,
    private httpService: HttpService,
    private toaster: ToasterService) { }

  ngOnInit() {
    
  }

  getAllEventsByJudgeId(organizationId) {
    this.httpService.get(UrlDetails.eventsListByOrganizerId + organizationId).subscribe((response) =>{
      this.getAllEventsByOrganizationIdSuccess(response);
    }, (error)=> {
      this.getAllEventsByOrganizationIdError(error);
    });
  }

  getAllEventsByOrganizationIdSuccess(response) {
    this.events = response;
      // this.toaster.showSuccess(Success.login);
  }

  getAllEventsByOrganizationIdError(error) {
    this.toaster.showError(Error.login);
  }


}
