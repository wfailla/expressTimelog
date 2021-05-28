import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDoneDisplayComponent } from './work-done-display.component';

describe('WorkDoneDisplayComponent', () => {
  let component: WorkDoneDisplayComponent;
  let fixture: ComponentFixture<WorkDoneDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkDoneDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDoneDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
