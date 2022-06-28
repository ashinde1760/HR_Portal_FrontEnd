import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTabComponent } from './emp-tab.component';

describe('EmpTabComponent', () => {
  let component: EmpTabComponent;
  let fixture: ComponentFixture<EmpTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
