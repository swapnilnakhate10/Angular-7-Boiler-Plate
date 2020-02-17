import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { UrlDetails } from 'src/app/constants/url-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { phoneNumberValidator } from '../../shared/field-validator';

@Component({
  selector: 'app-update-organizer',
  templateUrl: './update-organizer.component.html',
  styleUrls: ['./update-organizer.component.scss']
})
export class UpdateOrganizerComponent implements OnInit {

  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) {

    this.orgForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      organization: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required),
      contactNo: new FormControl('', [phoneNumberValidator, Validators.minLength(10)]),
      logo: new FormControl(''),
      dob: new FormControl('')
    });
  }

  organizerDetails = {};
  orgForm;
  submitted: boolean;
  public max = new Date();
  isLogoSelected: boolean = false;
  private imageSrc: string = 'assets/images/user.png';

  ngOnInit() {
    this.submitted = false;
    if (StorageService.get("isLoggedIn")) {
      this.getOrgDetails();
    } else {
      StorageService.removeAll();
      this.router.navigateByUrl('/');
    }
  }

  getOrgDetails() {
    this.httpService.get(UrlDetails.createOrganization + '/' + StorageService.get(StorageService.ORGANIZER_ID)).subscribe((response) => {
      this.organizerDetails = {
        orgId: response['_id'],
        name: response['name'],
        organization: response['organization'],
        email: response['email'],
        contactNo: response['contactNo'],
        type: StorageService.get(StorageService.USER_TYPE),
        password: response['password'],
        dob: response['dob'],   
        logo: response['logo']
      }
       this.imageSrc = response['logo'];
      this.setFormValues();
    }, (error) => {
      StorageService.removeAll();
      this.router.navigateByUrl('/');
      this.toaster.showError(error.errmsg);
    });
  }

  onSubmit(data) {
    this.submitted = true;
    if (this.orgForm.invalid) {
      return;
    }
    if (this.organizerDetails) {
      data['password'] = this.organizerDetails['password'];
      this.httpService.put(UrlDetails.createOrganization + '/' + this.organizerDetails['orgId'], data).subscribe((response) => {

        this.toaster.showSuccess("Organization updated successfully.");
        this.updateSuccess(response);
      }, (error) => {
        this.toaster.showError(error.errmsg);
      });
    }
  }

  updateSuccess(response) {
    StorageService.set("isLoggedIn", 'true');
    StorageService.set(StorageService.ORGANIZER_ID, response._id);
    StorageService.set(StorageService.ORGANIZER_GROUP_ID, response.groupId);
    StorageService.set(StorageService.ORGANIZER_NAME, response.name);
    StorageService.set(StorageService.CURRENT_ORGANIZATION_NAME, response.organization);
    StorageService.set(StorageService.ORGANIZER_EMAIL, response.email);
    StorageService.set(StorageService.ORGANIZER_CONTACT, response.contactNo);
    StorageService.set(StorageService.ORGANIZER_IMAGE, response.logo);
    StorageService.set(StorageService.USER_TYPE, "organizer");
    this.router.navigate(['/organizer']);
  }

  setFormValues() {
    this.orgForm.patchValue({
      email: this.organizerDetails['email'],
      organization: this.organizerDetails['organization'],
      name: this.organizerDetails['name'],
      contactNo: this.organizerDetails['contactNo']
    });

  }

  get f() { return this.orgForm.controls; }


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
    this.orgForm.controls['logo'].setValue(this.imageSrc);
  }
}
