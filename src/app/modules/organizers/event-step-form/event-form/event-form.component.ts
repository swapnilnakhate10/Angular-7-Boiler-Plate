import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Event } from '../../../../models/event';
import { UrlDetails } from '../../../../constants/url-details';
import { Success, Error } from '../../../../constants/messages';
import { HttpService } from './../../../shared/services/http.service';
import { StorageService } from './../../../shared/services/storage.service';
import { ToasterService } from './../../../shared/services/toaster.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  @Input() eventData: Event;
  @Output() eventForm = new EventEmitter<Event>();
  userForm;
  submitted: boolean;
  difficultyList: String[];
  teamSize: Number[];
  techonlogyList: String[];
  isLogoSelected: boolean = false;
  private imageSrc: string = '';

  constructor(private httpService: HttpService, private toaster:ToasterService) {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      shortDescription: new FormControl('', Validators.required),
      maxTeamSize: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
      logo: new FormControl(''),
      startDateTime: new FormControl('', Validators.required),
      endDateTime: new FormControl('', Validators.required),
      problemStatement: new FormControl('', Validators.required),
      rulesAndRegulations: new FormControl('', Validators.required),
      technologies: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    this.submitted = false;
    this.difficultyList = ['Easy', 'Medium', 'Hard'];
    this.teamSize = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.techonlogyList = ['Java', 'NodeJs', 'Angular 2', 'Angular 4', 'Angular 5', 'Angular 6', 'AngularJs']
  }

  submitEventData(data: any) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.addOrUpdateEvent(data);
  }

  addOrUpdateEvent(eventData: Event) {
    eventData.organizerId = StorageService.get(StorageService.ORGANIZER_ID);
    this.httpService.post(UrlDetails.events, eventData).subscribe((response) => {
      this.addOrUpdateEventSuccess(response);
    }, (error)=> {
      this.addOrUpdateEventError(error);
    });
  }

  addOrUpdateEventSuccess(data) {
    this.toaster.showSuccess(Success.createEvent);
    this.eventForm.emit(data);
  }

  addOrUpdateEventError(error) {
    this.toaster.showError(Error.createEvent);
  }

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
    this.userForm.controls['logo'].setValue(this.imageSrc);
  }
}
