import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStepFormComponent } from './event-step-form.component';

describe('EventStepFormComponent', () => {
  let component: EventStepFormComponent;
  let fixture: ComponentFixture<EventStepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventStepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
