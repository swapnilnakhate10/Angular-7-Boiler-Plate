import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateEventComponent } from './evaluate-event.component';

describe('EvaluateEventComponent', () => {
  let component: EvaluateEventComponent;
  let fixture: ComponentFixture<EvaluateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
