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
    this.teams = response[0].teams;
    // if(response[0].status === "published") {
    //   this.router.navigateByUrl('organizer/event-result/'+response[0]._id);
    // }
  }

  getAllTeamsDetailsError(error) {
    this.toaster.showError(Error.login);
  }

  submitEvaluation(evalutionData) {
    let body = { teams : evalutionData };
    this.httpService.put(UrlDetails.events+ this.eventId, body).subscribe((response) =>{
      this.submitEvaluationSuccess(response);
    }, (error)=> {
      this.submitEvaluationError(error);
    });
  }

  submitEvaluationSuccess(response) {
    this.toaster.showSuccess("Submitted successfully.");
  }

  submitEvaluationError(error) {
    this.toaster.showError("Error Submit.");
  }

  publishResult(evalutionData) {
    let body = { status: "completed" };
    this.httpService.put(UrlDetails.events+ this.eventId, body).subscribe((response) =>{
      this.publishResultSuccess(response);
    }, (error)=> {
      this.publishResultError(error);
    });
  }

  publishResultSuccess(response) {
    this.toaster.showSuccess("Result Published successfully.");
    this.router.navigateByUrl('event-result');
  }

  publishResultError(error) {
    this.toaster.showError("Error publishing result.");
  }

}
