import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternDashboardComponent } from './intern-dashboard/intern-dashboard.component';
import { InternWelcomeComponent } from './intern-welcome/intern-welcome.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmployeeTabComponent } from './components/employee-tab/employee-tab.component';
import { InternTabComponent } from './components/intern-tab/intern-tab.component';
import { ProjectsTabComponent } from './components/projects-tab/projects-tab.component';
import { LeaveTabComponent } from './components/leave-tab/leave-tab.component';
import { FeedbackTabComponent } from './components/feedback-tab/feedback-tab.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';




@NgModule({
  declarations: [
    InternDashboardComponent,
    InternWelcomeComponent,
    EmployeeTabComponent,
    InternTabComponent,
    ProjectsTabComponent,
    LeaveTabComponent,
    FeedbackTabComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
     RouterModule.forChild([
      {
        path: '',
        component: InternWelcomeComponent,
        children: [
          {
            path: 'dashboard',
            component: InternDashboardComponent,
          },
          {
            path: 'employees',
            component: EmployeeTabComponent,
          },
          {
            path: 'interns',
            component: InternTabComponent,
          },
          {
            path: 'projects',
            component: ProjectsTabComponent,
          },
          {
            path: 'leaves',
            component: LeaveTabComponent,
          },
          {
            path: 'feedback',
            component: FeedbackTabComponent,
          },
          {
            path: 'settings',
            component: ChangePasswordComponent,
          }
        
        ],
      },
    ]),
  ],
})
export class InternModule { }
