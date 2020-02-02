import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpService} from '../../shared/services/http.service';
import { UrlDetails } from '../../../constants/url-details';
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
  users: any;

  teams: any;

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

  // Form submit event
  register(formData) {
    this.submitted = true;
    if ( this.teamForm.invalid ) {
      return;
    }
    this.httpService.post(UrlDetails.teams, formData).subscribe((response) => {
      this.toaster.showSuccess( 'Team registered successfully.');
      this.router.navigate(['/user/my-team']);
      this.isTeamCreate = false;
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
  }

  constructor(private httpService: HttpService, private toaster: ToasterService,
    private router: Router) {
    this.users = [
      {id: 1, name:"Kaushal Kishor", designation:"Developer"},
      {id: 2, name:"Ashish Kumar", designation:"Data Scientist"}];

    this.teams = [
      {id:1,name:"Code Blooded",team_leader:"Amrish"},
      {id:2,name:"Runtime Terror",team_leader:"Kaushal Kishor"}];
  }

  ngOnInit() {

    // Fetching Teams data
    this.httpService.get(UrlDetails.teams).subscribe((response) => {
      const typedArray = new Uint8Array(response);
      const array = Array.from(typedArray);

      // for( let i = 0; i<array.length;i++){
      //  this.teams.push({id:i+1,name:array[i]['name'],team_leader:'John Doe'});
      // }
    console.log(typedArray);
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
