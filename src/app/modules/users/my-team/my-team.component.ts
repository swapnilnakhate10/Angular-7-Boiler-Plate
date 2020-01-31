import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  isTeamCreate:boolean = false;
  teams:any;

  //Methods
  createTeam() {
    this.isTeamCreate = true;
  }
  constructor() { 
    this.teams = [
      {id:1,name:"Code Blooded",team_leader:"Amrish"},
      {id:2,name:"Runtime Terror",team_leader:"Kaushal"}];
  }

  ngOnInit() {
  }

}
