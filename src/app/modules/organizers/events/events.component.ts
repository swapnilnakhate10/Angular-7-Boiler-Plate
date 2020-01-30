import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  editEvent(eventDetails) {
    //navigate to edit event
    let eventId = 12;
    this.router.navigateByUrl('/organizer/edit-event/'+eventId);
  }

}
