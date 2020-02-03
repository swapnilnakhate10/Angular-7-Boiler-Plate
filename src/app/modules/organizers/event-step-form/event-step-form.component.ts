import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event-step-form',
  templateUrl: './event-step-form.component.html',
  styleUrls: ['./event-step-form.component.scss']
})
export class EventStepFormComponent implements OnInit {

  @Input() eventData: Event;
  @Output() eventForm = new EventEmitter<Event>();
  currentStep: Number = 1;
  eventId : string;
  prizesData = [];

  constructor() { }

  ngOnInit() {
    if(this.eventData && this.eventData.prizes) {
      this.prizesData = this.eventData.prizes;
    }
  }

  onSubmitEventForm(data) {
    this.currentStep = 2;
    this.eventId = data._id;
  }

}
