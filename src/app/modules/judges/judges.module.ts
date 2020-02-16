import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudgesRoutingModule } from './judges-routing.module';
import { JudgesComponent } from './judges.component';
import { EventsListComponent } from './events-list/events-list.component';
import { JudgeHeaderComponent } from './judge-header/judge-header.component';
import { EvaluateEventComponent } from './evaluate-event/evaluate-event.component';

@NgModule({
  declarations: [JudgesComponent, EventsListComponent, JudgeHeaderComponent, EvaluateEventComponent],
  imports: [
    CommonModule,
    JudgesRoutingModule
  ]
})
export class JudgesModule { }
