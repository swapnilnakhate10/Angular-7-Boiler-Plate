import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizersComponent } from './organizers.component';
import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { OrganizerProfileComponent } from './organizer-profile/organizer-profile.component';
import { EvaluateEventComponent } from './evaluate-event/evaluate-event.component';
import { UpdateOrganizerComponent } from './update-organizer/update-organizer.component';
import { TeamDetailsComponent } from './events/team-details/team-details.component';
import { FinalResultComponent } from './evaluate-event/final-result/final-result.component';

const routes: Routes = [
  {
    path:'',
    component: OrganizersComponent,
    children : [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full'
      },
      {
        path: 'events',
        component : EventsComponent
      },
      {
        path: 'create-event',
        component : CreateEventComponent
      },
      {
        path: 'edit-event/:id',
        component : EditEventComponent
      },
      {
        path: 'evaluate/:id',
        component : EvaluateEventComponent
      },
      {
        path: 'my-profile',
        component: OrganizerProfileComponent
      },
      {
        path: 'update-profile',
        component: UpdateOrganizerComponent
      },
      {
        path: 'team-details/:eventId',
        component: TeamDetailsComponent
      },
      {
        path: 'event-result/:eventId',
        component : FinalResultComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizersRoutingModule { }
