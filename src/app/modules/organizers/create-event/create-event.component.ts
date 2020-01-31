import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';
import { HttpService } from '../../shared/services/http.service';
import { UrlDetails } from 'src/app/constants/url-details';
import { ToasterService } from '../../shared/services/toaster.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    // dateFormat: 'dd-mm-yyyy',
};

public model: any = { date: { year: new Date().getFullYear() , month: new Date().getMonth(), day: new Date().getDate() } };

  userForm;
  submitted: boolean;

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }


  onClickSubmit(data) {
  //  console.log("Form submitted")
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    let userModel = '';

     data.startDateTime= new Date(data.startDateTime.epoc);
    data.endDateTime=new Date(data.endDateTime.epoc);
   // data.prizes[0].rank=parseInt( data.prizes[0].rank); 
    delete data.prizes; // to be added later
    this.httpService.post( UrlDetails.createEvent,data).subscribe((response) =>{
     /*  this.loginSuccess(response); */
     this.toaster.showSuccess('Success');
    }, (error)=> {
      this.toaster.showError(error);
    })
    console.log(data)
    console.log("Form submitted")
  }

  constructor(private httpService: HttpService,
    private toaster: ToasterService ) { }

  difficultyList: String[];
  teamSize: String[];

  ngOnInit() {
    this.submitted = false;
    this.difficultyList = ['Easy', 'Medium', 'Hard'];
    this.teamSize = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      shortDescription: new FormControl('', Validators.required),
      maxTeamSize: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
      logo: new FormControl(''),
      startDateTime: new FormControl(''),
      endDateTime: new FormControl(''),
      problemStatement: new FormControl('', Validators.required),
      rulesAndRegulations: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required),
      prizes: new FormArray([this.createItem()])

    });
  }

  addPrize() {
    this.userForm.push(this.createItem());
  }

  removePrize(i: number) {
    this.userForm.removeAt(i);
  }

  createItem(): FormGroup {
    return new FormGroup({
      rank: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }

}

export interface Event {
  name: String,
  logo: String,
  shortDescription: String,
  maxTeamSize: number,
  startDateTime: Date,
  endDateTime: Date,
  problemStatement: String,
  rulesAndRegulations: String,
  winnerTeamId: String,
  status: String,
  prizes: [],
  technologies: String,
  difficulty: String
}

