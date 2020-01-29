import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizerRegistrationComponent } from './organizer-registration.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizerRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRegistrationRoutingModule { }
