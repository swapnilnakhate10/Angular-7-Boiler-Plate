import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrganizerComponent } from './update-organizer.component';

describe('UpdateOrganizerComponent', () => {
  let component: UpdateOrganizerComponent;
  let fixture: ComponentFixture<UpdateOrganizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrganizerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
