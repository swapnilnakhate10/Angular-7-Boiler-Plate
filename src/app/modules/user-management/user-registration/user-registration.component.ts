import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpService} from '../../shared/services/http.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
 model: userDetails;
  
  userForm;
  submitted:boolean;

  // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

  constructor(public httpService:HttpService, private toaster: ToasterService) { }

   roles:String[];
   sizes:String[];
  ngOnInit() {
    this.submitted = false;
    this.roles = ['Developer', 'Data Scientist'];
    this.sizes = ["Small","Medium","Large","Extra-Large","Tent"];
    this.userForm = new FormGroup({
                emailid: new FormControl('',Validators.required),
                fullname: new FormControl('',Validators.required),
                passwd: new FormControl('',Validators.required),
                number: new FormControl(''),
                gitId: new FormControl('',Validators.required),
                roles: new FormControl('',Validators.required),
                path: new FormControl('',),
                size: new FormControl('',)

    });
  }

  register(data) {
    let userModel = '';
    this.submitted = true;
    console.log(data);
    // this.httpService.post(UrlDetails.users, data).subscribe((response) =>{
    //   this.loginSuccess(response);
    // }, (error)=> {
    //   this.loginError(error);
    // })
  }

  loginSuccess(response) {
      this.toaster.showSuccess(Success.login);
      StorageService.set(StorageService.USER_ID, 'adwad');
  }

  loginError(error) {
    this.toaster.showError(Error.login);
  }
  
}

export interface userDetails {
    name: String,
    designation: String,
    email: String,
    address: String,
    contact: String,
    filelocation: String
}