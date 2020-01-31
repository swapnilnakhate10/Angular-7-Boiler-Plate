import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { OrganizersRoutingModule } from './organizers-routing.module';
import { OrganizersComponent } from './organizers.component';
import { EventsComponent } from './events/events.component';
import { EventFormComponent } from './event-form/event-form.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizerHeaderComponent } from './organizer-header/organizer-header.component';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { EvaluateEventComponent } from './evaluate-event/evaluate-event.component';

@NgModule({
  declarations: [OrganizersComponent, EventsComponent, EventFormComponent, CreateEventComponent, EditEventComponent, OrganizerHeaderComponent, OrganizerProfileComponent, EvaluateEventComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    FormsModule,
    OrganizersRoutingModule,
    SharedModule
  ]
})
export class OrganizersModule { }
