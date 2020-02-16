import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { EventService } from './../../shared/services/event.service';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  events = [];
  judgeId: any;

  constructor(private router: Router,
    private httpService: HttpService,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.judgeId = StorageService.get(StorageService.JUDGE_ID);
    this.getAllEventsByJudgeId(this.judgeId);
  }

  getAllEventsByJudgeId(judgeId) {
    this.httpService.get(UrlDetails.eventsListByJudgeId + judgeId).subscribe((response) =>{
      this.getAllEventsByJudgeIdSuccess(response);
    }, (error)=> {
      this.getAllEventsByJudgeIdError(error);
    });
  }

  getAllEventsByJudgeIdSuccess(response) {
    this.events = response;
  }

  getAllEventsByJudgeIdError(error) {
    this.toaster.showError(Error.login);
  }

  evaluateEvent(event) {
    console.log('Evaluate event : '+ JSON.stringify(event));
  }


}
