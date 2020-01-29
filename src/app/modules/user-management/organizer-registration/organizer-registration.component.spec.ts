import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerRegistrationComponent } from './organizer-registration.component';

describe('OrganizerRegistrationComponent', () => {
  let component: OrganizerRegistrationComponent;
  let fixture: ComponentFixture<OrganizerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
