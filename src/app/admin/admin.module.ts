import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmpTabComponent } from './components/emp-tab/emp-tab.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InternTabComponent } from './components/intern-tab/intern-tab.component';
import { ProjectsTabComponent } from './components/projects-tab/projects-tab.component';
import { LeaveTabComponent } from './components/leave-tab/leave-tab.component';
import { ReportTabComponent } from './components/report-tab/report-tab.component';
import { DateofjoingTabComponent } from './components/dateofjoing-tab/dateofjoing-tab.component';
import { DocumentationTabComponent } from './components/documentation-tab/documentation-tab.component';
import { ReviewTabComponent } from './components/review-tab/review-tab.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    WelcomeContentComponent,
    EmpTabComponent,
    RegistrationComponent,
    InternTabComponent,
    ProjectsTabComponent,
    LeaveTabComponent,
    ReportTabComponent,
    DateofjoingTabComponent,
    DocumentationTabComponent,
    ReviewTabComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: WelcomeComponent,
        children: [
          {
            path: 'welContent',
            component: WelcomeContentComponent,
          },
          {
            path: 'employee',
            component: EmpTabComponent,
          },
          {
            path: 'register',
            component: RegistrationComponent,
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
            path: 'joiningdate',
            component: DateofjoingTabComponent,
          },
          {
            path: 'documents',
            component: DocumentationTabComponent,
          },
          {
            path: 'review',
            component: ReviewTabComponent,
          },
        ],
      },
    ]),
  ],
})
export class AdminModule {}
