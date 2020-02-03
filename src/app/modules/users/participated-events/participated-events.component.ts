import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { HttpService } from '../../shared/services/http.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { UrlDetails } from '../../../constants/url-details';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participated-events',
  templateUrl: './participated-events.component.html',
  styleUrls: ['./participated-events.component.scss']
})
export class ParticipatedEventsComponent implements OnInit {

  currentTeamId: any;
  events = [];

  constructor(private httpService: HttpService,
              private toaster: ToasterService,
              private router: Router) { }

  ngOnInit() {
    this.currentTeamId = StorageService.get(StorageService.USER_CURRENT_TEAM_ID);
    this.getAllEventsByTeamId(this.currentTeamId);
  }

  getAllEventsByTeamId(teamId) {
    this.httpService.get(UrlDetails.events).subscribe((response) =>{
      this.getAllEventsByTeamIdSuccess(response);
    }, (error)=> {
      this.getAllEventsByTeamIdError(error);
    });
  }

  getAllEventsByTeamIdSuccess(response) {
    this.events = response;
  }

  getAllEventsByTeamIdError(error) {
    this.toaster.showError("Error getting participated events.");
  }

  startChallenge(eventDetails) {
    this.router.navigateByUrl('user/challenge/'+eventDetails._id);
  }
}
