import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerLoginComponent } from './organizer-login.component';

describe('OrganizerLoginComponent', () => {
  let component: OrganizerLoginComponent;
  let fixture: ComponentFixture<OrganizerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
