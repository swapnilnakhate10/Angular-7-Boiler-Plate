import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { OrganizerRegistrationRoutingModule } from './organizer-registration-routing.module';
import { OrganizerRegistrationComponent } from './organizer-registration.component';

@NgModule({
  declarations: [OrganizerRegistrationComponent],
  imports: [
    CommonModule,
    OrganizerRegistrationRoutingModule,
    SharedModule
  ]
})
export class OrganizerRegistrationModule { }
