import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinnerListForEventRoutingModule } from './winner-list-for-event-routing.module';
import { WinnerListForEventComponent } from './winner-list-for-event.component';

@NgModule({
  declarations: [WinnerListForEventComponent],
  imports: [
    CommonModule,
    WinnerListForEventRoutingModule
  ]
})
export class WinnerListForEventModule { }
