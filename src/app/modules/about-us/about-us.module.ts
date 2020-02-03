import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AboutUsRoutingModule,
    SharedModule
  ],
  exports: [AboutUsComponent]
})
export class AboutUsModule { }
