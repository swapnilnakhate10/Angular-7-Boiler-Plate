import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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


  onClickSubmit(data) { 
    this.submitted = true;
        if(this.userForm.invalid){
          return;
        }
        console.log(data)
        console.log("Form submitted")
    }

  constructor() { }

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
  
}

export interface userDetails {
    name: String,
    designation: String,
    email: String,
    address: String,
    contact: String,
    filelocation: String
}