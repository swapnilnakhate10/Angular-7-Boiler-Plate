import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-evaluate-event',
  templateUrl: './evaluate-event.component.html',
  styleUrls: ['./evaluate-event.component.scss']
})
export class EvaluateEventComponent implements OnInit {

  eventDetails : Event;
  teams = [];
  eventId: any;
  judgeId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { 
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.judgeId = StorageService.get(StorageService.JUDGE_ID);
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

}
