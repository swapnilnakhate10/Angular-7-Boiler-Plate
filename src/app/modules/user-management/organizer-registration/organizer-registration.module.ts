import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../shared/shared.module';
import { OrganizerRegistrationRoutingModule } from './organizer-registration-routing.module';
import { OrganizerRegistrationComponent } from './organizer-registration.component';
import { ReactiveFormsModule } from "@angular/forms";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [OrganizerRegistrationComponent],
  imports: [
    CommonModule,
    OrganizerRegistrationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class OrganizerRegistrationModule { }
