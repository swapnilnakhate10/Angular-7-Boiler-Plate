import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { UsersComponent } from './users.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
