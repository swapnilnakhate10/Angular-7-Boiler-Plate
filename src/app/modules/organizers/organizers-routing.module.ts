import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizersComponent } from './organizers.component';
import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizersRoutingModule { }
