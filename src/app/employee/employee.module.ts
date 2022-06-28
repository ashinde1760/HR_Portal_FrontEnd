import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpWelcomeComponent } from './emp-welcome/emp-welcome.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmployeeTabComponent } from './components/employee-tab/employee-tab.component';
import { InternTabComponent } from './components/intern-tab/intern-tab.component';
import { ProjectsTabComponent } from './components/projects-tab/projects-tab.component';
import { LeaveTabComponent } from './components/leave-tab/leave-tab.component';
import { ReportTabComponent } from './components/report-tab/report-tab.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BillingComponent } from './components/billing/billing.component';
import { PoliciesComponent } from './components/policies/policies.component';



@NgModule({
  declarations: [

    EmpDashboardComponent,
    EmpWelcomeComponent,
    EmployeeTabComponent,
    InternTabComponent,
    ProjectsTabComponent,
    LeaveTabComponent,
    ReportTabComponent,
    ChangePasswordComponent,
    BillingComponent,
    PoliciesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmpWelcomeComponent,
        children: [
          {
            path: 'dashboard',
            component: EmpDashboardComponent,
          },
          {
            path: 'employees',
            component: EmployeeTabComponent,
          },
          {
            path: 'intern',
            component: InternTabComponent,
          },
          {
            path: 'projects',
            component: ProjectsTabComponent,
          },
          {
            path: 'leave',
            component: LeaveTabComponent,
          },
          {
            path: 'report',
            component: ReportTabComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
          {
            path: 'billing',
            component: BillingComponent,
          },
          {
            path: 'policies',
            component: PoliciesComponent,
          }
        ],
      },
    ]),
  ],
})
export class EmployeeModule { }
