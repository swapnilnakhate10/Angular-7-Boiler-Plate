import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from './../../../shared/services/toaster.service';
import { HttpService } from './../../../shared/services/http.service';
import { Success, Error } from '../../../../constants/messages';
import { UrlDetails } from '../../../../constants/url-details';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  teams = [];
  eventId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { 
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    console.log('Event Id : '+this.eventId);
    this.getAllTeamsDetails(this.eventId);
  }

  getAllTeamsDetails(eventId) {
    this.httpService.get(UrlDetails.events+ eventId +'/team').subscribe((response) =>{
      this.getAllTeamsDetailsSuccess(response);
    }, (error)=> {
      this.getAllTeamsDetailsError(error);
    });
  }

  getAllTeamsDetailsSuccess(response) {
    this.teams = response[0].teams;
  }

  getAllTeamsDetailsError(error) {
    this.toaster.showError(Error.login);
  }

}
