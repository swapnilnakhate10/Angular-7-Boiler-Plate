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
  this.login( StorageService.get("isLoggedIn"));
  }
toggleLogin(value:any) {
if(value.target.value=='yes') {
  this.showuserSignIn = true;
}
  else {
this.showuserSignIn = false;
  }

}
  login(value:any) { 
    if(value == 'true') {
     this.router.navigate(['/user']);
     return;
    } 
    if(this.userLogin.invalid){
          return;
       }
    let userModel = '';
    this.httpService.post(UrlDetails.userLoginUrl,value).subscribe((response) =>{
      this.loginSuccess(response);
    }, (error)=> {
      this.loginError(error);
    })
  }
onOrgLogin(value:any) { 
    
    let userModel = '';
    this.httpService.post(UrlDetails.organizationLogin,value).subscribe((response) =>{
      this.loginSuccessOrg(response);
    }, (error)=> {
      this.loginError(error);
    })
  }

  loginSuccessOrg(response) {
      this.toaster.showSuccess(Success.login);
      this.router.navigate(['/organizer']);
  }

  loginSuccess(response) {
      this.toaster.showSuccess(Success.login);
      this.router.navigate(['/user']);
  }

  loginError(error) {
    this.toaster.showError(error.message);
  }

}
