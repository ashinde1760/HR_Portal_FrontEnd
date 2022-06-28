import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateofjoingTabComponent } from './dateofjoing-tab.component';

describe('DateofjoingTabComponent', () => {
  let component: DateofjoingTabComponent;
  let fixture: ComponentFixture<DateofjoingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateofjoingTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateofjoingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
