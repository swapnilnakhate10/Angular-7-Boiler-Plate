import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizersRoutingModule } from './organizers-routing.module';
import { OrganizersComponent } from './organizers.component';
import { EventsComponent } from './events/events.component';
import { EventFormComponent } from './event-step-form/event-form/event-form.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizerHeaderComponent } from './organizer-header/organizer-header.component';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluateEventComponent } from './evaluate-event/evaluate-event.component';
import { EventStepFormComponent } from './event-step-form/event-step-form.component';
import { PrizeFormComponent } from './event-step-form/prize-form/prize-form.component';
import { UpdateOrganizerComponent } from './update-organizer/update-organizer.component';
import { EventService } from '../shared/services/event.service';
import { TeamDetailsComponent } from './events/team-details/team-details.component';
import { FinalResultComponent } from './evaluate-event/final-result/final-result.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TagInputModule } from 'ngx-chips';
import { JudgeListComponent } from './judge-list/judge-list.component';
import { JudgeFormComponent } from './judge-form/judge-form.component';

@NgModule({
  declarations: [OrganizersComponent, EventsComponent, EventFormComponent, CreateEventComponent, EditEventComponent, OrganizerHeaderComponent, OrganizerProfileComponent, EvaluateEventComponent, EventStepFormComponent, PrizeFormComponent, UpdateOrganizerComponent, TeamDetailsComponent, FinalResultComponent, JudgeListComponent, JudgeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OrganizersRoutingModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TagInputModule
  ],
  providers: [EventService]
})
export class OrganizersModule { }
