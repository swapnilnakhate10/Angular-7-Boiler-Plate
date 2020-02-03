import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpService} from '../../shared/services/http.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { Router } from "@angular/router";
import { ToasterService } from "src/app/modules/shared/services/toaster.service";
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
 model: userDetails;
  
  userForm;
  submitted:boolean;
isVisiblePassword: boolean = false;

  roles:String[];
  sizes:String[];
  constructor(private httpService: HttpService, private StorageService: StorageService,
              private toaster: ToasterService, private router: Router) { }

  // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

  onClickSubmit(data) { 
    this.submitted = true;
        if(this.userForm.invalid){
          return;
        }
        console.log(data)
        console.log("Form submitted")
        
    this.httpService.post(UrlDetails.users,data).subscribe((response) =>{
      this.toaster.showSuccess("User registered successfully.");
      StorageService.set("isLoggedIn",'true');
      this.router.navigate(['/user']);
    }, (error)=> {
      this.toaster.showError(error.errmsg);
    });
    }

   
  ngOnInit() {
    this.submitted = false;
    this.roles = ['Developer', 'Data Scientist'];
    this.sizes = ["Small","Medium","Large","Extra-Large","Tent"];
    this.userForm = new FormGroup({
                email: new FormControl('',Validators.required),
                firstName: new FormControl('',Validators.required),
                lastName: new FormControl('',Validators.required),
                password: new FormControl('',Validators.required),
                contactNumber: new FormControl(''),
                gitId: new FormControl('',Validators.required),
                designation: new FormControl('',Validators.required),
                image: new FormControl('',),
                tShirtSize: new FormControl('',)

    });
  }

  register(data) {
    let userModel = '';
    this.submitted = true;
    // console.log(data);
    this.httpService.post(UrlDetails.users, data).subscribe((response) =>{
      this.loginSuccess(response);
    }, (error)=> {
      this.loginError(error);
    })
  }

  loginSuccess(response) {
      this.toaster.showSuccess(Success.login);
      StorageService.set("isLoggedIn",'true');
        StorageService.set(StorageService.USER_ID, response._id);
        StorageService.set(StorageService.USER_FIRSTNAME, response.firstName);
        StorageService.set(StorageService.USER_LASTNAME, response.lastName);
        StorageService.set(StorageService.USER_EMAIL, response.email);
        StorageService.set(StorageService.USER_TYPE, "user");
      this.router.navigate(['/user']);
  }

  loginError(error) {
    this.toaster.showError(Error.login);
  }

// Toggle Password input field from plain text to password dots
  showPassword(passowrd) {
     this.isVisiblePassword = !this.isVisiblePassword;
     passowrd.type = this.isVisiblePassword? "text":"password";
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