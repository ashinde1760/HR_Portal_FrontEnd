import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Intern } from 'src/app/model/Intern';
import { InternService } from 'src/app/services/intern.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intern-tab',
  templateUrl: './intern-tab.component.html',
  styleUrls: ['./intern-tab.component.css'],
  providers: [MessageService],
})
export class InternTabComponent implements OnInit {

  internData!:Intern[];
  intern!:Intern;
  internTable=true;
  internDetails=false;
  checked1: boolean = true;
  loader: boolean = true;

  submitted?: boolean;
  internDialogue?: boolean;
 
   //for fetching user from employee
   username:any;
  
  constructor(private internservice:InternService,private messageService:MessageService,private userService:UserService) { }

  ngOnInit(): void {

    this.internservice.loadAllInterns().subscribe((data:any)=>{
      this.internData = data;
        
      console.log(data);

      
    });
  }

  

  
  //for searching 
  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  //for hiding intern list and showing intern form
  editIntern(intern:Intern){
    this.intern = { ...intern };
    // this.submitted=false;
    this.internDialogue = true;
    console.log("intern:" + intern);
  }

  hideDialog() {
    this.internDialogue = false;
    this.submitted = false;
  }



}
