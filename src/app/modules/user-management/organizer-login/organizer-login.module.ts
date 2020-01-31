import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { OrganizerLoginRoutingModule } from './organizer-login-routing.module';
import { OrganizerLoginComponent } from './organizer-login.component';

@NgModule({
  declarations: [OrganizerLoginComponent],
  imports: [
    CommonModule,
    OrganizerLoginRoutingModule,
    SharedModule
  ]
})
export class OrganizerLoginModule { }
