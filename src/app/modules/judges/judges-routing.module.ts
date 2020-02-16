import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JudgesComponent } from './judges.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EvaluateEventComponent } from './evaluate-event/evaluate-event.component';

const routes: Routes = [
  {
    path : '',
    component: JudgesComponent,
    children : [
      {
        path : '',
        redirectTo : 'events',
        pathMatch : 'full'
      },
      {
        path : 'events',
        component: EventsListComponent
      },
      {
        path: 'evaluate/:id',
        component : EvaluateEventComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JudgesRoutingModule { }
