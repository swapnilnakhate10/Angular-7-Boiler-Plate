import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../shared/services/http.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { Router } from "@angular/router";
import { ToasterService } from "src/app/modules/shared/services/toaster.service";
import { phoneNumberValidator } from '../../shared/field-validator';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  model: userDetails;

  userForm;
  submitted: boolean = false;
  isVisiblePassword: boolean = false;
  public max = new Date();
  isLogoSelected: boolean = false;
  private imageSrc: string = '';
  roles: String[];
  sizes: String[];

  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) { }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onClickSubmit(data) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    console.log(data)
    console.log("Form submitted")

    this.httpService.post(UrlDetails.users, data).subscribe((response) => {
      this.toaster.showSuccess("User registered successfully.");
      StorageService.set("isLoggedIn", 'true');
      this.router.navigate(['/user']);
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.roles = ['Developer', 'Data Scientist'];
    this.sizes = ["Small", "Medium", "Large", "Extra-Large", "Tent"];
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [phoneNumberValidator, Validators.minLength(10)]),
      gitId: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      image: new FormControl(''),
      dob: new FormControl('', Validators.required),
      tShirtSize: new FormControl('')

    });
  }

  register(data) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let userModel = '';
    this.httpService.post(UrlDetails.users, data).subscribe((response) => {
      if (response['errmsg']) {
        this.toaster.showError("Something went wrong.");
        return;
      }
      this.loginSuccess(response);
    }, (error) => {
      this.loginError(error);
    })
  }

  loginSuccess(response) {
    this.toaster.showSuccess("Register successfully");
    StorageService.set("isLoggedIn", 'true');
    StorageService.set(StorageService.USER_ID, response._id);
    StorageService.set(StorageService.USER_FIRSTNAME, response.firstName);
    StorageService.set(StorageService.USER_LASTNAME, response.lastName);
    StorageService.set(StorageService.USER_EMAIL, response.email);
    StorageService.set(StorageService.USER_DESIGNATION, response.designation);
    StorageService.set(StorageService.USER_IMAGE, response.image);
    StorageService.set(StorageService.USER_TYPE, "user");
    this.router.navigate(['/user']);
  }

  loginError(error) {
    this.toaster.showError(Error.login);
  }

  // Toggle Password input field from plain text to password dots
  showPassword(passowrd) {
    this.isVisiblePassword = !this.isVisiblePassword;
    passowrd.type = this.isVisiblePassword ? "text" : "password";
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.isLogoSelected = true;
    this.userForm.controls['image'].setValue(this.imageSrc);
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