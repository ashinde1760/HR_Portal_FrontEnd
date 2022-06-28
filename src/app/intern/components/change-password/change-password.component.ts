import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  updateForm:FormGroup
  submitted1 = false;
  public emp={
    oldPassword :'',
    newPassword:''

  }
 
  constructor( private messageService:MessageService,private userService:UserService, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required,]],
      newPassword: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
    
      });
 
  }
  get f1() { return this.updateForm.controls; }

  changePassword(emp:any)
  {
    this.submitted1 = true;
   
    if (this.updateForm.invalid) {
      return;
  }

 
  if(this.submitted1)
  {
        this.userService.changePassword(emp.oldPassword,emp.newPassword).subscribe(
          (data)=>{
            
          Swal.fire('Done', 'Your Password has been changed!!..Please Login Again!', 'success');
          this.router.navigate(["/auth/login"])
        
        },
        (error)=>{
          Swal.fire('Oops', 'Please Enter Correct Password!!','error')
        }
        
        );
}
  }
  }


