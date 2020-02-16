import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from 'src/app/constants/url-details';
import { StorageService } from '../../shared/services/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../shared/field-validator';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userForm;
  submitted: boolean;
  isVisiblePassword: boolean = false;
  roles: String[];
  sizes: String[];
  userDetails = {};
  public max = new Date();
  isLogoSelected: boolean = false;

  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) {
    this.userForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
                firstName: new FormControl('',Validators.required),
                lastName: new FormControl('',Validators.required),
                contactNumber: new FormControl('',[phoneNumberValidator,Validators.minLength(10)]),
                gitId: new FormControl('',Validators.required),
                designation: new FormControl('',Validators.required),
                image: new FormControl('',),
                tShirtSize: new FormControl('',),
                dob: new FormControl('',)
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  ngOnInit() {
    this.submitted = false;
    this.roles = ['Developer', 'Data Scientist'];
    this.sizes = ["Small", "Medium", "Large", "Extra-Large", "Tent"];
    if (StorageService.get("isLoggedIn")) {
      this.getUserDetails();
    } else {
      StorageService.removeAll();
      this.router.navigateByUrl('/');
    }
  }

  getUserDetails() {
    this.httpService.get(UrlDetails.users + '/' + StorageService.get(StorageService.USER_ID)).subscribe((response) => {
      this.userDetails = {
        userId: response['_id'],
        firstName: response['firstName'],
        lastName: response['lastName'],
        gitId: response['gitId'],
        email: response['email'],
        image: response['image'],
        designation: response['designation'],
        tShirtSize: response['tShirtSize'],
        contactNumber: response['contactNumber'],
        dob: new Date(response['dob']),
        type: StorageService.get(StorageService.USER_TYPE),
        password: response['password']
      }
      this.setFormValues();
    }, (error) => {
      StorageService.removeAll();
      this.router.navigateByUrl('/');
      this.toaster.showError(error.errmsg);
    });
  }

  updateDetails(data) {
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    if (this.userDetails) {
      // console.log(data)
      // console.log("Form submitted")
      data['password'] = this.userDetails['password'];
      this.httpService.put(UrlDetails.users + '/' + this.userDetails['userId'], data).subscribe((response) => {
        if(response['errmsg']){
          this.toaster.showError("Something went wrong.");
          return;
        }
        this.toaster.showSuccess("User details updated successfully.");
        this.updateSuccess(response);
      }, (error) => {
        this.toaster.showError(error.errmsg);
      });
    }
  }

  updateSuccess(response) {
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

  setFormValues() {
    this.userForm.patchValue({
      firstName: this.userDetails['firstName'],
      lastName: this.userDetails['lastName'],
      email: this.userDetails['email'],
      contactNumber: this.userDetails['contactNumber'],
      designation: this.userDetails['designation'],
      tShirtSize: this.userDetails['tShirtSize'],
      gitId: this.userDetails['gitId'],
      image:this.userDetails['image']
    });
  }

  private imageSrc: string = '';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if(file){
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
    this.isLogoSelected=true;
    this.userForm.controls['image'].setValue(this.imageSrc);
  }
}
