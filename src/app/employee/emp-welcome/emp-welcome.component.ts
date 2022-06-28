import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Menu } from 'src/app/employee/emp-welcome/model/menu';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-emp-welcome',
  templateUrl: './emp-welcome.component.html',
  styleUrls: ['./emp-welcome.component.css'],
  providers: [MessageService],
})
export class EmpWelcomeComponent implements OnInit {
 
  profilePic="";
  menus : Menu[] = [];
  snav!:boolean;
  username = '';
  empId= "";
  uplo:File;
  uploadedFiles: any[] = [];
  constructor(private router:Router,private empService:EmployeeService, private messageService: MessageService, private loginService:LoginService) { 
    this.menus = [];
    this.menus.push(new Menu("Dashboard","pi pi-home","/employee"));
  }

  ngOnInit(): void {
       this.username = sessionStorage.getItem('loggedUser');

this.loginService.getCurrentUser().subscribe((user:any)=>{
        
  this.profilePic = user.employee.profilePic;
});

    this.router.navigate(['/employee/dashboard']);
  
  }

  onMenuClick(menu: Menu){
    this.router.navigate([menu.routeLink]);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  onUpload(event)
  {
    for(let file of event.files) {
     
      this.uplo = file;
    
   }
         this.uploadFile();
      
  }


  uploadFile()
  {
    console.log("in uplaod file...........");
    
    this.empId = sessionStorage.getItem("empId");
    this.empService.uploadProfilePic(this.uplo, this.empId).subscribe(data=>{
      this.ngOnInit();
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
     
    },error => {
      console.log(error);
    });
  }

}
