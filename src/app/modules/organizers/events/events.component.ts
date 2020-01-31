import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [];

  constructor(private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { }

  ngOnInit() {
    this.getAllEventsByOrganizationId();
  }

  getAllEventsByOrganizationId() {
    this.httpService.get(UrlDetails.eventsListByOrganizerId).subscribe((response) =>{
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

}
