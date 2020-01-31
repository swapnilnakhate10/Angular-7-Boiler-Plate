import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLoginRoutingModule } from './user-login-routing.module';
import { UserLoginComponent } from './user-login.component';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    UserLoginRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserLoginModule { }
