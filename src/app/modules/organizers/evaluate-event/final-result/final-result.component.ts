import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from './../../../shared/services/toaster.service';
import { HttpService } from './../../../shared/services/http.service';
import { Success, Error } from '../../../../constants/messages';
import { UrlDetails } from '../../../../constants/url-details';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.scss']
})
export class FinalResultComponent implements OnInit {

  eventDetails: any;
  winnerResults = [];
  prizes = [];
  eventId: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toaster: ToasterService) { 
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    console.log('Event Id : '+this.eventId);
    this.getAllPrizesForAnEvent(this.eventId);
  }

  getAllPrizesForAnEvent(eventId) {
    this.httpService.get(UrlDetails.prizes + 'event/'+ eventId).subscribe((response) =>{
      this.getAllPrizesForAnEventSuccess(response);
    }, (error)=> {
      this.getAllPrizesForAnEventError(error);
    });
  }

  getAllPrizesForAnEventSuccess(data) {
    data.sort((a, b) => {return a.rank - b.rank});
    this.prizes = data;
    console.log('this.prizes : '+ JSON.stringify(this.prizes));
    this.getWinnersForAnEvent(this.eventId);
  }

  getAllPrizesForAnEventError(error) {
    this.toaster.showError("Error getting prizes.");
  }

  getWinnersForAnEvent(eventId) {
    this.httpService.get(UrlDetails.events+ eventId +'/team').subscribe((response) =>{
      this.getWinnersForAnEventSuccess(response);
    }, (error)=> {
      this.getWinnersForAnEventError(error);
    });
  }
  
  getWinnersForAnEventSuccess(response) {
    this.eventDetails = response[0];
    let allTeams = response[0].teams;
    allTeams.forEach(element => {
      element.evaluations.forEach((evaluation) => {
        let stringResult = JSON.stringify(evaluation.score / evaluation.maxScore * (evaluation.weightage / 100));
        evaluation["finalScore"] = parseFloat(stringResult).toFixed(2);
      });
      element["finalScore"] = this.getSum(element.evaluations);
    });
    allTeams.sort((a, b) => {return b.finalScore - a.finalScore});
    let winnersLength  = this.prizes.length;
    this.winnerResults = allTeams.splice(0,winnersLength);
  }

  getSum(evaluationList) {
    let finalScore = 0;
    for(let evaluation of evaluationList) {
      finalScore = finalScore + parseFloat(evaluation.finalScore);
    }
    return finalScore;
  }

  getWinnersForAnEventError(error) {
    this.toaster.showError(Error.login);
  }

  publishResult() {
    let body = { status: "published" };
    this.httpService.put(UrlDetails.events+ this.eventId, body).subscribe((response) =>{
      this.publishResultSuccess(response);
    }, (error)=> {
      this.publishResultError(error);
    });
  }

  publishResultSuccess(response) {
    this.toaster.showSuccess("Result Published successfully.");
  }

  publishResultError(error) {
    this.toaster.showError("Error publishing result.");
  }


}
