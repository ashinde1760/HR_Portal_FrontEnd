import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InternService } from 'src/app/services/intern.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  providers: [MessageService],
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  registerInternForm: FormGroup;

  submitted = false;
  submitted1 = false;


  public user ={
    username:'',
    password:'',
       employee:
         {
          name:'',
          location:'',
          designation:'',
          mobile:'',
          email:'',
          department:''
           }
       };

       public user1 = {
         username:'',
          password:'',
          intern:
            {
             name:'',
             location:'',
             mentor:'',
             mobile:'',
             email:'',
             projectname:'',
             address:''
              }
            }


  constructor(private userService:UserService, private messageService:MessageService, private internService:InternService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      name: ['', [Validators.required, Validators.minLength(6)]],
      location: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern("[\\d]{10}")]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9_.]+[@][a-z]+[.][a-z]{2,3}")]],
      department: ['', [Validators.required]],
      });


//  Validations for InternS............

this.registerInternForm = this.formBuilder.group({
  username: ['', [Validators.required]],
  password: ['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
  name: ['', [Validators.required, Validators.minLength(6)]],
  location: ['', [Validators.required]],
  address: ['', [Validators.required]],
  mobile: ['', [Validators.required, Validators.pattern("[\\d]{10}")]],
  email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9_.]+[@][a-z]+[.][a-z]{2,3}")]],
  projectname: ['', [Validators.required]],
  mentor: ['', [Validators.required]],
  });

    }

    
  
    get f() { return this.registerForm.controls; }
    get f1() { return this.registerInternForm.controls;}
  formSubmit()
  {
    this.submitted = true;
   
    if (this.registerForm.invalid) {
      return;
  }

  //addUser:userservice
  if(this.submitted)
  {
   
  
   this.userService.addUser(this.user).subscribe((data:any)=>{
     console.log(data);
    // alert('success')
      Swal.fire('Success!!','Employee Succesfully Registered!!','success')  
   },
   (error)=>{
     console.log(error)
     Swal.fire('Error!!','Something Went Wrong!!','error')  
   }
   )
  }
}
    

   formSubmitIntern()
  {
    
    this.submitted1 = true;
   
    if (this.registerInternForm.invalid) {
      return;
    }
    // if(this.user1.username == ''|| this.user1.username == null){
    //  // alert('User is Required!!');
    //  alert("Username is Required!!!")
    //  this.messageService.add({severity: 'error', summary: 'Username is required', detail: ''});
    //   return;
    // }

  //addUser:userservice
  if(this.submitted1){
   this.userService.addIntern(this.user1).subscribe((data:any)=>{
     console.log(data);
    // alert('success')
      Swal.fire('Success!!','Intern Succesfully Registered!!','success')  
   },
   (error)=>{
     console.log(error)
     Swal.fire('Error!!','Something Went Wrong!!','error')  
   }
   )
    
  }
}


  }


