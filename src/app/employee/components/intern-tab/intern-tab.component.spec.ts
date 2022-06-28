import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternTabComponent } from './intern-tab.component';

describe('InternTabComponent', () => {
  let component: InternTabComponent;
  let fixture: ComponentFixture<InternTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
