import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimereportComponent } from './timereport.component';

describe('TimereportComponent', () => {
  let component: TimereportComponent;
  let fixture: ComponentFixture<TimereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
