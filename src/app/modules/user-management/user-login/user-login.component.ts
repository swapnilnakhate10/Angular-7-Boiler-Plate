import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  userLogin;
  orgLogin;
  showuserSignIn:boolean = true;
  
  constructor(private httpService: HttpService, private StorageService: StorageService,
              private toaster: ToasterService, private router: Router) { 
    this.userLogin = new FormGroup({
        email: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required),
    });
    this.orgLogin = new FormGroup({
        email: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required),
    });
  }

  ngOnInit() {

  }

  toggleLogin(value:any) {
    if(value.target.value=='yes') {
      this.showuserSignIn = true;
    } else {
    this.showuserSignIn = false;
    }
  }

  login(value:any) { 
    this.httpService.post(UrlDetails.userLoginUrl,value).subscribe((response) =>{
      this.loginSuccess(response);
    }, (error)=> {
      this.loginError(error);
    })
  }

  onOrgLogin(value:any) { 
    this.httpService.post(UrlDetails.organizationLogin,value).subscribe((response) =>{
      this.loginSuccessOrg(response);
    }, (error)=> {
      this.loginError(error);
    })
  }

  loginSuccessOrg(response) {
      StorageService.set(StorageService.ORGANIZER_ID, response._id);
      StorageService.set(StorageService.CURRENT_ORGANIZATION_NAME, response.organization);
      StorageService.set(StorageService.ORGANIZER_NAME, response.name);
      StorageService.set(StorageService.ORGANIZER_EMAIL, response.email);
      StorageService.set(StorageService.USER_TYPE, "organizer");
      this.router.navigate(['/organizer']);
  }

  loginSuccess(response) {
      StorageService.set(StorageService.USER_ID, response._id);
      StorageService.set(StorageService.USER_FIRSTNAME, response.firstName);
      StorageService.set(StorageService.USER_LASTNAME, response.lastName);
      StorageService.set(StorageService.USER_EMAIL, response.email);
      StorageService.set(StorageService.USER_TYPE, "user");
      this.router.navigate(['/user']);
  }

  loginError(error) {
    this.toaster.showError(error.message);
  }

}
