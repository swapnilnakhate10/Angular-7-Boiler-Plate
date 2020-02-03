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

  // convenience getter for easy access to form fields
    get f() { return this.teamForm.controls; }

  // Button create click event to create new Team
  createTeam() {
    this.isTeamCreate = true;
    this.submitted = false;
  }

  // Cancel button click event
  cancel() {
    this.submitted = false;
    this.isTeamCreate = false;
  }

  searchMember(data){
     this.httpService.post(UrlDetails.users+'search',{searchText: data}).subscribe((response:any) => {
        for(let i =0;i<response.length;i++) {
            this.users.push(response[i]);
        }     
        this.toaster.showInfo("Found "+response.length+" member.");
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
   
    this.isMemberFound = true;
  }

  addMemeber(memeber){
    this.members.push(memeber);
  }

  // Form submit event
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

  constructor(private httpService: HttpService, private toaster: ToasterService,
    private router: Router) {
   
    
  }

  ngOnInit() {


    if(!StorageService.get("isLoggedIn")) {
      this.router.navigate(['/landing']);
    }

    this.userID =  StorageService.get(StorageService.USER_ID);
   
    // Fetching Teams data
    this.httpService.get(UrlDetails.teams+'user/'+this.userID).subscribe((response) => {
     if(response.byteLength>0){
      //  response.forEach((team)=>{
      //   this.teams.push(team);
      // })
    } else {
      this.toaster.showSuccess( 'No Teams availables. You can create a new Team');
    }
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });

     this.teamForm = new FormGroup({
                name: new FormControl('', Validators.required),
                tagline: new FormControl('Programming rocks!'),
                path: new FormControl('',) ,
                demoURL: new FormControl('')
     });
  }

}
