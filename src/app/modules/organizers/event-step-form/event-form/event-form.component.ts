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

  constructor(private httpService: HttpService, private toaster:ToasterService) {
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
      technologies: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    this.submitted = false;
    this.difficultyList = ['Easy', 'Medium', 'Hard'];
    this.teamSize = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
}
