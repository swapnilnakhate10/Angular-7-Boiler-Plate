import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';
import { ToasterService } from './../../shared/services/toaster.service';
import { StorageService } from './../../shared/services/storage.service';
import { Success, Error } from '../../../constants/messages';
import { UrlDetails } from '../../../constants/url-details';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-organizer-registration',
  templateUrl: './organizer-registration.component.html',
  styleUrls: ['./organizer-registration.component.scss']
})
export class OrganizerRegistrationComponent implements OnInit {
orgForm;
   constructor(private httpService: HttpService, private StorageService: StorageService,
              private toaster: ToasterService, private router: Router) { 
      this.orgForm = new FormGroup({
                email: new FormControl('',Validators.required),
                organization: new FormControl('',Validators.required),
                name: new FormControl('',Validators.required),
                password: new FormControl('',Validators.required),
                contactNo: new FormControl(''),
                logo: new FormControl('')

    });
              }

  ngOnInit() {
  }

onSubmit(data) { 
        // if(this.orgForm.invalid){
        //   return;
        // }
        console.log(data)
        console.log("Form submitted")
        
    this.httpService.post(UrlDetails.createOrganization,data).subscribe((response) =>{
      this.toaster.showSuccess("User registered successfully.");
      StorageService.set("isLoggedIn",'true');
      this.router.navigate(['/user']);
    }, (error)=> {
      this.toaster.showError(error.errmsg);
    });
    }
}
