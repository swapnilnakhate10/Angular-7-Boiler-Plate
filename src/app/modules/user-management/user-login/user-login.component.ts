import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private httpService: HttpService, 
              private toaster: ToasterService) { }

  ngOnInit() {
    this.login();
  }

  login() {
    let userModel = '';
    this.httpService.get(UrlDetails.users).subscribe((response) =>{
      this.loginSuccess(response);
    }, (error)=> {
      this.loginError(error);
    })
  }

  loginSuccess(response) {
      this.toaster.showSuccess(Success.login);
      StorageService.set(StorageService.USER_ID, 'adwad');
  }

  loginError(error) {
    this.toaster.showError(Error.login);
  }

}
