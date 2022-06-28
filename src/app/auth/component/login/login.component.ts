import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  loginData = {
    username:"",
    password:""
  }

  constructor(private loginservice:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log("login btn clicked");
    if(this.loginData.username.trim()==''|| this.loginData.username==null)
    {
      alert("username is required!!")
    }
    this.loginservice.generateToken(this.loginData).subscribe(
      (data:any)=>{
         console.log(data)
         Swal.fire({
           position:'top',
          icon: 'success',
          title: 'Login Successfull!!',
          showConfirmButton: false,
          timer: 1500
        })

        //login........
        this.loginservice.loginUser(data.token);
        this.loginservice.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginservice.setUser(user);
            console.log(user);
           
            //redirect Admin...Admin dashboard
            //redirect Emplolyee...Employee Dashboard
            //redirect Intern...Intern Dashboard
           
            if(this.loginservice.getUserRole()=="ADMIN")
            {   
              //Admin dashboard
               this.router.navigate(['/admin'])
                  
            }else if(this.loginservice.getUserRole()=="EMPLOYEE")
            {
              //Employee Dashboard
              console.log(this.loginservice.getUserRole())
              this.router.navigate(['/employee'])
              sessionStorage.setItem("empId",user.employee.id);
               sessionStorage.setItem("loggedUser",user.employee.name);
 
            }else if(this.loginservice.getUserRole()=="INTERN")
            {
                //Intern Dashboard
                this.router.navigate(['/intern'])
                sessionStorage.setItem("empId",user.intern.id);
                sessionStorage.setItem("loggedUser",user.intern.name);
          
            }else{
              this.loginservice.logout();
              

            }

          });
        
        

      },
      (error)=>{
           console.log(error)
           Swal.fire({
            position:'top',
           icon: 'error',
           title: 'Invalid Credentials!!!',
           showConfirmButton: false,
           timer: 1500
         })
      }
      );
    
  }
  

}
