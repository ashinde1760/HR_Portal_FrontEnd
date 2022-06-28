import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpWelcomeComponent } from './emp-welcome.component';

describe('EmpWelcomeComponent', () => {
  let component: EmpWelcomeComponent;
  let fixture: ComponentFixture<EmpWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
