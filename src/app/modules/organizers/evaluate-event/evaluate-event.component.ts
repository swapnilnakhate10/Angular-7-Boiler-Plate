import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';

@Component({
  selector: 'app-evaluate-event',
  templateUrl: './evaluate-event.component.html',
  styleUrls: ['./evaluate-event.component.scss']
})
export class EvaluateEventComponent implements OnInit {

  eventDetails : Event;
  teams = [];
  eventId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { 
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
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
    this.eventDetails = response[0];
    this.teams = response[0].teams;
    if(response[0].status === "published") {
      this.router.navigateByUrl('organizer/event-result/'+response[0]._id);
    }
  }

  getAllTeamsDetailsError(error) {
    this.toaster.showError(Error.login);
  }


  publishResult() {
    this.router.navigateByUrl('organizer/event-result/'+this.eventId);
  }
}
