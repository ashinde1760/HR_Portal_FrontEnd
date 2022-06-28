import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { InternModule } from './intern/intern.module';
import { AdminGuard } from './services/admin.guard';
import { EmployeeGuard } from './services/employee.guard';
import { InternGuard } from './services/intern.guard';


const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:"auth"
  },
  {
    path:"auth",
    loadChildren:()=> AuthModule
  },
  {
    path:"admin",
    loadChildren:()=> AdminModule,
    canActivate:[AdminGuard],
  },
  {
    path:"employee",
    loadChildren:()=>EmployeeModule,
    canActivate:[EmployeeGuard]
  },
  {
    path:"intern",
    loadChildren:()=>InternModule,
    canActivate:[InternGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
