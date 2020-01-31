import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { UsersHeaderComponent } from './users-header/users-header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [UsersComponent, DashboardComponent, MyTeamComponent, UsersHeaderComponent, UserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
