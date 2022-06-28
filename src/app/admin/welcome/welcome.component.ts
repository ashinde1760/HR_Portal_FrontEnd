import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './model/menu';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  menus : Menu[] = [];
  snav!:boolean;
  

  constructor(private router:Router) {
    this.menus = [];
    this.menus.push(new Menu("Dashboard","pi pi-home","/admin"));
    // this.menus.push(new Menu("Client-Master","pi pi-users","home/client"));
    // this.menus.push(new Menu("User Management","pi pi-users","home/team"));
    // this.menus.push(new Menu("My Workspace","pi pi-briefcase","home/project" ));
   }

  ngOnInit(): void {
    this.router.navigate(['/admin/welContent']);
    // this.onMenuClick(this.menus[0]);
      

  }

  onMenuClick(menu: Menu){
    this.router.navigate([menu.routeLink]);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/auth']);
  }
}
