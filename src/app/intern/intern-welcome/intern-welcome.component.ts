import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InternService } from 'src/app/services/intern.service';
import { LoginService } from 'src/app/services/login.service';
import { Menu } from '../model/menu';

@Component({
  selector: 'app-intern-welcome',
  templateUrl: './intern-welcome.component.html',
  styleUrls: ['./intern-welcome.component.css'],
  providers: [MessageService],
})
export class InternWelcomeComponent implements OnInit {
  snav!:boolean;
  username = '';
  profilePic="";
  menus : Menu[] = [];
  internId= "";
  uplo:File;
  uploadedFiles: any[] = [];
  constructor(private router:Router,  private loginService:LoginService, private internService:InternService, private messageService:MessageService) {
    this.menus = [];
    this.menus.push(new Menu("Dashboard","pi pi-home","/intern"));
  }
   

  ngOnInit(): void {
    this.username = sessionStorage.getItem('loggedUser');

    
this.loginService.getCurrentUser().subscribe((user:any)=>{
        
  this.profilePic = user.intern.profilePic;
});
  this.router.navigate(['/intern/dashboard']);
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
    
    this.internId = sessionStorage.getItem("empId");
    this.internService.uploadProfilePic(this.uplo, this.internId).subscribe(data=>{
      this.ngOnInit();
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
     
    },error => {
      console.log(error);
    });
  }


}
