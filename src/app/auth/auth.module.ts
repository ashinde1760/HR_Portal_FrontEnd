import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './component/navbar/navbar.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      [
        {
          path:"",
          component:HomeComponent
        },
        {
          path:"login",
          component:LoginComponent
        }
    ]
    )
  ]
})
export class AuthModule { }
