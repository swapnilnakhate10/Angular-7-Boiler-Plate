import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeHeaderComponent } from './judge-header.component';

describe('JudgeHeaderComponent', () => {
  let component: JudgeHeaderComponent;
  let fixture: ComponentFixture<JudgeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
