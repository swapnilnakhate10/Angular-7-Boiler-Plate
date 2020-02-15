import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { phoneNumberValidator } from '../../shared/field-validator';
@Component({
  selector: 'app-organizer-registration',
  templateUrl: './organizer-registration.component.html',
  styleUrls: ['./organizer-registration.component.scss']
})
export class OrganizerRegistrationComponent implements OnInit {
  orgForm;
  submitted: boolean;
  isVisiblePassword: boolean = false;
  public max = new Date();
  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) {
    this.orgForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      organization: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      contactNo: new FormControl('', [phoneNumberValidator, Validators.minLength(10)]),
      logo: new FormControl(''),
      dob: new FormControl('', Validators.required)
    });
  }

  get f() { return this.orgForm.controls; }

  ngOnInit() {
    this.submitted = false;
  }

  showPassword(password) {
    this.isVisiblePassword = !this.isVisiblePassword;
    password.type = this.isVisiblePassword ? "text" : "password";
  }

  onSubmit(data:any) {
    this.submitted = true;
    if (this.orgForm.invalid) {
      return;
    }
    this.httpService.post(UrlDetails.createOrganization, data).subscribe((response) => {
      this.toaster.showSuccess("Organization registered successfully.");
      this.registerSuccess(response);
    }, (error) => {
      this.toaster.showError(error.errmsg);
    });
  }

  registerSuccess(response) {
    StorageService.set("isLoggedIn", 'true');
    StorageService.set(StorageService.ORGANIZER_ID, response._id);
    StorageService.set(StorageService.ORGANIZER_NAME, response.name);
    StorageService.set(StorageService.CURRENT_ORGANIZATION_NAME, response.organization);
    StorageService.set(StorageService.ORGANIZER_EMAIL, response.email);
    StorageService.set(StorageService.ORGANIZER_CONTACT, response.contactNo);
    StorageService.set(StorageService.USER_TYPE, "organizer");
    this.router.navigate(['/organizer']);
  }
}
