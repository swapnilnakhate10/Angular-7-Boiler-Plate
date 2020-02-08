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
  users: any=[];
  userID: any;
  teams: any = [];
  members: any =[];
  teamForm;

  constructor(private httpService: HttpService, private toaster: ToasterService,
    private router: Router) {  }

  ngOnInit() {
    this.userID =  StorageService.get(StorageService.USER_ID);
    if(!StorageService.get("isLoggedIn")) {
      this.router.navigate(['/landing']);
    }
    this.teamForm = new FormGroup({
        name: new FormControl('', Validators.required),
        tagline: new FormControl('Programming rocks!'),
        path: new FormControl('',) ,
        demoURL: new FormControl('')
    });
    this.getTeams(this.userID);
  }

  getTeams(userID) {
    this.httpService.get(UrlDetails.teams+'user/'+userID).subscribe((response:any) => {
      if(response.length>0){
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

  cancel() {
    this.submitted = false;
    this.isTeamCreate = false;
  }

  searchMember(data){
     this.httpService.post(UrlDetails.users+'search',{searchText: data}).subscribe((response:any) => {
        for(let i =0;i<response.length;i++) {
            this.users.push(response[i]);
        }     
        this.isMemberFound = true;
        this.toaster.showInfo("Found "+response.length+" member.");
    }, (error) => {
      this.isMemberFound = true;
      this.toaster.showError(error.errmsg);
    });
  }

  addMemeber(memeber){
    this.members.push(memeber);
  }

  register(formData) {
    formData.teamLeaderId = this.userID;
    formData.members  = this.members;
    this.submitted = true;
    if ( this.teamForm.invalid ) {
      return;
    }
    this.httpService.post(UrlDetails.teams, formData).subscribe((response) => {
      this.isTeamCreate = false;
      this.toaster.showSuccess( 'Team registered successfully.');
      this.router.navigate(['/user/my-team']);
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
  }

}
