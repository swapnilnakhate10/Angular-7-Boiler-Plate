
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from './../../shared/services/storage.service';

import { ToasterService } from './../../shared/services/toaster.service';
import { HttpService } from './../../shared/services/http.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teamForm;
  submitted:boolean;
  teamCreate:boolean;
  userId:any;
  events = [];
  teams = [];
  selectedTeam : any;

  constructor(private router: Router,
            private httpService: HttpService,
            private toaster: ToasterService) { }

  ngOnInit() {
    this.userId = StorageService.get(StorageService.USER_ID);
     if(!StorageService.get("isLoggedIn")) {
      this.router.navigate(['/landing']);
      return;
    }
    this.teamForm = new FormGroup({
                teamname: new FormControl('',Validators.required),
                teamIconPath: new FormControl('',Validators.required),
                tagline: new FormControl('')
    });
    this.getAllEventsByOrganizationId();
    this.getAllTeamsForUser(this.userId);
  }

  getAllEventsByOrganizationId() {
    this.httpService.get(UrlDetails.events).subscribe((response) =>{
      this.getAllEventsByOrganizationIdSuccess(response);
    }, (error)=> {
      this.getAllEventsByOrganizationIdError(error);
    });
  }

  getAllEventsByOrganizationIdSuccess(response) {
    this.events = response;
  }

  getAllEventsByOrganizationIdError(error) {
    this.toaster.showError(Error.login);
  }

  getAllTeamsForUser(userID) {
    this.httpService.get(UrlDetails.teams + 'user/'+ userID).subscribe((response:any) => {
      this.teams = response;
      this.selectedTeam = response[0];
      this.setTeamMemberDetails(this.selectedTeam);
    }, (error) => {
       this.toaster.showError(error.errmsg);
     });
  }

  onClickSubmit(data) { 
      this.submitted = true;
      if(this.teamForm.invalid) {
        return;
      }
  }

  get f() {
     return this.teamForm.controls;
  }

  changeTeam(teamDetails) {
    this.setTeamMemberDetails(teamDetails);
  }

  viewResult(eventId) {
    this.router.navigateByUrl('user/eventresult/'+eventId);
  }

  setTeamMemberDetails(teamDetails) {
    let teamMemberGitIds = [];
    const teamMembers = teamDetails.members;
    teamMembers.forEach(element => {
      if(element && element.gitId) {
        teamMemberGitIds.push(element.gitId);
      }
    });
    StorageService.set(StorageService.USER_CURRENT_TEAM_ID, teamDetails._id);
    StorageService.set(StorageService.CURRENT_TEAM_MEMBERS_GITID, teamMemberGitIds);
  }

  enrollForEvent(eventDetails) {
    console.log(this.selectedTeam);
    if(this.selectedTeam && this.selectedTeam._id) {
      this.applyForAnEvent(eventDetails._id);
    } else {
      this.toaster.showWarning("Please select Team");
    }
  }

  applyForAnEvent(evenId) {
    let updateBody = {
      "eventId" : evenId,
      "teamId" : this.selectedTeam._id
    };
    this.httpService.put(UrlDetails.events + 'enroll', updateBody).subscribe((response:any) => {
      this.toaster.showSuccess("Successfully enrolled for an event.");
    }, (error) => {
       this.toaster.showError(error.error.message);
     });
  }

}
