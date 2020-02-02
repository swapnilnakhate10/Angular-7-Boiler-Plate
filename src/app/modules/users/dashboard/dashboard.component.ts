import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  events = [];

  constructor(private router: Router,
            private httpService: HttpService,
            private toaster: ToasterService) { }

  ngOnInit() {
    this.teamForm = new FormGroup({
                teamname: new FormControl('',Validators.required),
                teamIconPath: new FormControl('',Validators.required),
                tagline: new FormControl('')
    });
    this.getAllEventsByOrganizationId();
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

  onClickSubmit(data) { 
      this.submitted = true;
      if(this.teamForm.invalid){
        return;
      }
      console.log(data)
      console.log("Form submitted")
  }

  get f() {
     return this.teamForm.controls;
  }

  startChallenge(eventDetails) {
    this.router.navigateByUrl('user/challenge/'+eventDetails._id);
  }

}
