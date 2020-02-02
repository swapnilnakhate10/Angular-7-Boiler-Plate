import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartChallengeComponent } from './start-challenge.component';

describe('StartChallengeComponent', () => {
  let component: StartChallengeComponent;
  let fixture: ComponentFixture<StartChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
