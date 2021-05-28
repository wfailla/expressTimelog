import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackingTimeDisplayComponent } from './slacking-time-display.component';

describe('SlackingTimeDisplayComponent', () => {
  let component: SlackingTimeDisplayComponent;
  let fixture: ComponentFixture<SlackingTimeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlackingTimeDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackingTimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
