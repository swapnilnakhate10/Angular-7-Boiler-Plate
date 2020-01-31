import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinnerEvaluationForEventRoutingModule } from './winner-evaluation-for-event-routing.module';
import { WinnerEvaluationForEventComponent } from './winner-evaluation-for-event.component';

@NgModule({
  declarations: [WinnerEvaluationForEventComponent],
  imports: [
    CommonModule,
    WinnerEvaluationForEventComponent
  ]
})
export class  WinnerEvaluationForEventModule { }
