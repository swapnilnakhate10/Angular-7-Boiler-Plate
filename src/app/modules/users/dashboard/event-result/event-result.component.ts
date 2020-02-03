import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from './../../../shared/services/toaster.service';
import { HttpService } from './../../../shared/services/http.service';
import { Success, Error } from '../../../../constants/messages';
import { UrlDetails } from '../../../../constants/url-details';

@Component({
  selector: 'app-event-result',
  templateUrl: './event-result.component.html',
  styleUrls: ['./event-result.component.scss']
})
export class EventResultComponent implements OnInit {


  winnerResults = [];
  eventId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { 
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    console.log('Event Id : '+this.eventId);
    this.getWinnersForAnEvent(this.eventId);
  }
  getWinnersForAnEvent(eventId) {
    this.httpService.get(UrlDetails.events+ eventId +'/team').subscribe((response) =>{
      this.getWinnersForAnEventSuccess(response);
    }, (error)=> {
      this.getWinnersForAnEventError(error);
    });
  }
  
  getWinnersForAnEventSuccess(response) {
    let allTeams = response[0].teams;
    allTeams.sort((a, b) => {return b.finalScore - a.finalScore});
    this.winnerResults = allTeams.splice(0,3);
  }

  getWinnersForAnEventError(error) {
    this.toaster.showError(Error.login);
  }

}
