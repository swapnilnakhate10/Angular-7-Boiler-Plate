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
    this.createGithubRepoWithTeamAccess();
  }

  getEventError(error) {
    this.toaster.showError(Error.getEvent);
  }
  
  getEventPrizesList(eventId) {
    this.httpService.get(UrlDetails.prizes +'event/'+eventId).subscribe((response) => {
      this.getEventPrizesListSuccess(response);
    }, (error)=> {
      this.getEventPrizesListError(error);
    });
  }

  getEventPrizesListSuccess(data) {
    this.prizes = data;
  }

  getEventPrizesListError(error) {
    this.toaster.showError(Error.getEvent);
  }

  createGithubRepoWithTeamAccess() {
    let requesyBody = {
        "name": "Test-Hackathon-Repo",
        "description": "This is your Hackthon repo",
        "private": false,
        "reponame": "ashish9308/Test-Hackathon-Repo",
        "userlist" : ["ashish-9308"]
      };
    this.httpService.post(UrlDetails.createAndAddAccessToUser, requesyBody).subscribe((response) => {
      this.createGithubRepoWithTeamAccessSuccess(response);
    }, (error)=> {
      this.createGithubRepoWithTeamAccessError(error);
    });
  }

  
  createGithubRepoWithTeamAccessSuccess(data) {
    console.log(data);
    this.event.githubRepoLink = data;
    console.log('Success creating github repo');
  }

  createGithubRepoWithTeamAccessError(error) {
    console.log('Error creating github repo');
  }


}
