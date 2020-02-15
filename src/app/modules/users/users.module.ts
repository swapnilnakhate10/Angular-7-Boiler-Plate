import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { UsersHeaderComponent } from './users-header/users-header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StartChallengeComponent } from './start-challenge/start-challenge.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ParticipatedEventsComponent } from './participated-events/participated-events.component';
import { EventResultComponent } from './dashboard/event-result/event-result.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [UsersComponent, DashboardComponent, MyTeamComponent, UsersHeaderComponent, UserProfileComponent, StartChallengeComponent, UpdateUserComponent, ParticipatedEventsComponent, EventResultComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class UsersModule { }
