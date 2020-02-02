import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-start-challenge',
  templateUrl: './start-challenge.component.html',
  styleUrls: ['./start-challenge.component.scss']
})
export class StartChallengeComponent implements OnInit {

  prizes = [];
  eventId: any;
  event: Event;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { 
  }
  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.getEventPrizesList(this.eventId);
    this.getEvent(this.eventId);
  }

  getEvent(eventId) {
    this.httpService.get(UrlDetails.events+eventId).subscribe((response) => {
      this.getEventSuccess(response);
    }, (error)=> {
      this.getEventError(error);
    });
  }

  getEventSuccess(data) {
    this.event = data;
  }

  getEventError(error) {
  }
  
  getEventPrizesList(eventId) {
    this.httpService.get(UrlDetails.prizes +'event/'+eventId).subscribe((response) => {
      this.getEventDataSuccess(response);
    }, (error)=> {
      this.getEventDataError(error);
    });
  }

  getEventDataSuccess(data) {
    this.prizes = data;
  }

  getEventDataError(error) {
  }


}
