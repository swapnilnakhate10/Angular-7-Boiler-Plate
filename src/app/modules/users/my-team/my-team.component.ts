import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpService} from '../../shared/services/http.service';
import { UrlDetails } from '../../../constants/url-details';
import { StorageService } from './../../shared/services/storage.service';

import { ToasterService } from 'src/app/modules/shared/services/toaster.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  isTeamCreate = false;
  submitted = false;
  isMemberFound = false;
  userEmail: any;
  users: any = [];
  userID: any;
  teams: any = [];
  members: any = [];
  teamForm;

  constructor(private httpService: HttpService, private toaster: ToasterService,
    private router: Router) {  }

  ngOnInit() {
    this.userID =  StorageService.get(StorageService.USER_ID);
    if (!StorageService.get( 'isLoggedIn')) {
      this.router.navigate(['/landing']);
    }
    this.teamForm = new FormGroup({
        name: new FormControl('', Validators.required),
        tagline: new FormControl('Programming rocks!'),
        path: new FormControl('') ,
        demoURL: new FormControl('')
    });
    this.getTeams(this.userID);
  }

  getTeams(userID) {
    this.httpService.get(UrlDetails.teams + 'user/' + userID).subscribe((response: any) => {
      if ( response.length > 0 ) {
        this.teams = response;
      } else {
        this.toaster.showSuccess( 'No Teams availables. You can create a new Team');
      }
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
  }

  get f() { return this.teamForm.controls; }

  createTeam() {
    this.isTeamCreate = true;
    this.submitted = false;
  }

removeMemeber(index) {
  this.members.splice(index, 1);
}

keyUser(usermail) {
  if ( usermail.length === 3 ) {
    this.users = [];
     this.httpService.post(UrlDetails.users + 'search', { searchText: usermail }).subscribe((response: any) => {
        for ( let i = 0; i < response.length; i++) {
            this.users.push(response[i]);
        }
        this.isMemberFound = true;
        this.toaster.showInfo( 'Found ' + response.length + ' member.');
    }, (error) => {
      this.isMemberFound = true;
      this.toaster.showError(error.errmsg);
    });
  } else if (usermail.length > 3) {

    this.users.forEach((item, index) => {
      const regExp = new RegExp(`^${usermail}`);
      if (!regExp.test(item.email)) {
        this.users.splice(index, 1);
      }
    });
  } else if ( usermail.length < 3) {
    this.users = [];
  }
}

cancel() {
    this.submitted = false;
    this.isTeamCreate = false;
}

  addMemeber(memeber) {
    this.members.push(memeber);
  }

register(formData) {
    if ( this.teamForm.invalid ) {
      this.toaster.showError( 'Please fill the form correctly.');
      return;
    }
    formData.teamLeaderId = this.userID;
    formData.members = this.members;
    formData.members.push(this.userID);
    this.submitted = true;
    this.httpService.post(UrlDetails.teams, formData).subscribe((response) => {
      this.isTeamCreate = false;
      this.toaster.showSuccess( 'Team registered successfully.');
      this.router.navigate(['/user/my-team']);
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
}



removeMemberFromTeam(teamDetails: any, teamMemberId: any) {
    teamDetails.members = teamDetails.members.filter((member: any) => {
      return (teamMemberId !== member._id);
    });
    this.httpService.put(UrlDetails.teams + teamDetails._id, teamDetails).subscribe((response) => {
      this.toaster.showSuccess('Member removed successfully.');
      this.getTeams(this.userID);
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
  }

}
