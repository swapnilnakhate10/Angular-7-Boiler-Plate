import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRegistrationRoutingModule } from './organizer-registration-routing.module';
import { OrganizerRegistrationComponent } from './organizer-registration.component';

@NgModule({
  declarations: [OrganizerRegistrationComponent],
  imports: [
    CommonModule,
    OrganizerRegistrationRoutingModule
  ]
})
export class OrganizerRegistrationModule { }
