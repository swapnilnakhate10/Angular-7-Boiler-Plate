import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users.component';
import { StartChallengeComponent } from './start-challenge/start-challenge.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ParticipatedEventsComponent } from './participated-events/participated-events.component';
import { EventResultComponent } from './dashboard/event-result/event-result.component';

const routes: Routes = [
  {
    path:'',
    component: UsersComponent,
    children: [
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'my-team',
        component: MyTeamComponent
      },
      {
        path:'my-profile',
        component: UserProfileComponent
      },
      {
        path:'challenge/:eventId',
        component: StartChallengeComponent
      },
      {
        path:'update-profile',
        component: UpdateUserComponent
      },
      {
        path:'participated-events',
        component: ParticipatedEventsComponent
      },
      {
        path : 'eventresult/:eventId',
        component: EventResultComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
