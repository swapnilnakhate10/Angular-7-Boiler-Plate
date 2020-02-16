import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: './modules/landing-page/landing-page.module#LandingPageModule',
  },
  {
    path: 'user-login',
    loadChildren: './modules/user-management/user-login/user-login.module#UserLoginModule',
  },
  {
    path: 'user-registration',
    loadChildren: './modules/user-management/user-registration/user-registration.module#UserRegistrationModule',
  },
  {
    path: 'organizer-login',
    loadChildren: './modules/user-management/organizer-login/organizer-login.module#OrganizerLoginModule',
  },
  {
    path: 'organizer-registration',
    loadChildren: './modules/user-management/organizer-registration/organizer-registration.module#OrganizerRegistrationModule',
  },
  {
    path: 'user',
    loadChildren: './modules/users/users.module#UsersModule',
  },
  {
    path: 'organizer',
    loadChildren: './modules/organizers/organizers.module#OrganizersModule'
  },
  {
    path: 'judges',
    loadChildren: './modules/judges/judges.module#JudgesModule'
  },
  {
    path: 'about',
    loadChildren: './modules/about-us/about-us.module#AboutUsModule',
  }, 
  {
    path: 'contacts',
    loadChildren: './modules/contact-us/contact-us.module#ContactUsModule',
  },
  {
    path: '**',
    loadChildren: './modules/page-not-found/page-not-found.module#PageNotFoundModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
