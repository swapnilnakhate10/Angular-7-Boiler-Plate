import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  isTeamCreate:boolean = false;
  submitted:boolean = false;
  users:any;

  teams:any;

  teamForm;

  // convenience getter for easy access to form fields
    get f() { return this.teamForm.controls; }

  //Button create click event to create new Team
  createTeam() {
    this.isTeamCreate = true;
    this.submitted = false;
  }

  //Cancel button click event
  cancel(){
    this.submitted = false;
    this.isTeamCreate = false;
  
  }

  //Form submit event
  register(formData){
    this.submitted = true;
    if(this.teamForm.invalid)
     return;
     console.log(formData);
  }

  constructor() { 
    this.users = [
      {id:1,name:"Kaushal Kishor",designation:"Developer"},
      {id:2,name:"Ashish Kumar",designation:"Data Scientist"}];

    this.teams = [
      {id:1,name:"Code Blooded",team_leader:"Amrish"},
      {id:2,name:"Runtime Terror",team_leader:"Kaushal Kishor"}];
  }

  ngOnInit() {
     this.teamForm = new FormGroup({
                teamname: new FormControl('',Validators.required),
                tagline: new FormControl('Programming rocks!'),
                path: new FormControl('',) ,
                demoURL: new FormControl('')
     });
  }

}
