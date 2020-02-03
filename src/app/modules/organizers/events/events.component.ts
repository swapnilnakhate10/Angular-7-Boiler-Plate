import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { EventDataSource } from './event.datasource';
import { EventService } from './../../shared/services/event.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  dataSource:EventDataSource;
  organizationId : any;
  events = [];

  constructor(private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService, private eventService: EventService) { }

  ngOnInit() {
    this.organizationId = StorageService.get(StorageService.ORGANIZER_ID);
    this.getAllEventsByOrganizationId(this.organizationId);

    // this.dataSource = new EventDataSource(this.eventService);
    // this.dataSource.loadBreakings();
  }

  getAllEventsByOrganizationId(organizationId) {
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

  editEvent(eventDetails) {
    let eventId = eventDetails._id;
    this.router.navigateByUrl('/organizer/edit-event/'+eventId);
  }

  evaluateEvent(eventDetails) {
    let eventId = eventDetails._id;
    this.router.navigateByUrl('/organizer/evaluate/'+eventId);
  }

  cancelEvent(eventDetails) {
    let eventId = eventDetails._id;
    const updateStatus = { status : "cancelled" };
    this.httpService.put(UrlDetails.events + eventId, updateStatus).subscribe((response) =>{
      this.cancelEventSuccess(response);
    }, (error)=> {
      this.cancelEventError(error);
    });
  }

  cancelEventSuccess(response) {
      this.toaster.showSuccess(Success.cancelEvent);
  }

  cancelEventError(error) {
    this.toaster.showError(Error.cancelEvent);
  }

  viewegisteredTeamsForEvent(eventDetails) {
    this.router.navigateByUrl('/organizer/team-details/'+eventDetails._id);
  }

}
