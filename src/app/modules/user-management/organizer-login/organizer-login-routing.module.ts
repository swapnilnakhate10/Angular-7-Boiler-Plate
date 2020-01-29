import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizerLoginComponent } from './organizer-login.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizerLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerLoginRoutingModule { }
