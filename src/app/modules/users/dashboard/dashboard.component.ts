import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teamForm;
  submitted:boolean;
  teamCreate:boolean;

  // convenience getter for easy access to form fields
  get f() { return this.teamForm.controls; }

  onClickSubmit(data) { 
    this.submitted = true;
        if(this.teamForm.invalid){
          return;
        }
        console.log(data)
        console.log("Form submitted")
    }
  
   constructor() { }

  ngOnInit() {

    this.teamForm = new FormGroup({
                teamname: new FormControl('',Validators.required),
                teamIconPath: new FormControl('',Validators.required),
                tagline: new FormControl('')
    });
  }

}
