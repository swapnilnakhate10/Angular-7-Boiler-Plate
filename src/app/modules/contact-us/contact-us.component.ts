import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { StorageService } from '../shared/services/storage.service';
import { ToasterService } from '../shared/services/toaster.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private httpService: HttpService, private StorageService: StorageService,
    private toaster: ToasterService, private router: Router) { }

    userForm;
    submitted:boolean;	

  get f() { return this.userForm.controls; }

  ngOnInit() {
    this.submitted = false;
    this.userForm = new FormGroup({
                 email: new FormControl('',Validators.required),
                 firstName: new FormControl('',Validators.required),
                lastName: new FormControl('',Validators.required),
                contactNumber: new FormControl('',Validators.required),
                msg: new FormControl('',Validators.required),

    });
  }

  register(data) {
    if(data && !this.userForm.invalid)    
    this.toaster.showSuccess("Thank you for reaching out!");
  }

}

