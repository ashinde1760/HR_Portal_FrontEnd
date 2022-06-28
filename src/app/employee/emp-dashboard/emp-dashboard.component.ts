import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/model/Employee';
import { DocumentsService } from 'src/app/services/documents.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { saveAs } from 'file-saver';

import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { documents } from 'src/app/model/documents';
import { UserService } from 'src/app/services/user.service';
import { ComDocumentService } from 'src/app/services/com-document.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
  providers: [MessageService],
})
export class EmpDashboardComponent implements OnInit {
  
  updateForm: FormGroup;
  displayBasic = true;
  documents:documents[]=[];
  employee?:Employee;
  empId = "";
  message = '';
  errorMsg:string;
  selectedFiles?: FileList;
  currentFile?: File;
  profilePic="";
  submitted = false;
  constructor( private docsService:DocumentsService, private formBuilder: FormBuilder,private comDocService:ComDocumentService,private empService:EmployeeService, private docService:DocumentsService, private messageService:MessageService, private loginService:LoginService, private userService:UserService) { }
     
  ngOnInit(): void {
   
    this.empId = sessionStorage.getItem("empId");
   
    this.loginService.getCurrentUser().subscribe((user:any)=>{
      this.profilePic = user.employee.profilePic;
      
    this.employee = user.employee

   })
 

   this.empService.getEmployee(this.empId).subscribe((data:any)=>{
     this.documents = data.documents;
   })

   this.updateForm = this.formBuilder.group({
   
    name:['',[Validators.required,Validators.pattern("[a-zA-Z ]{2,30}")]],
    mobile: ['', [Validators.required, Validators.pattern("[\\d]{10}")]],
    email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9_.]+[@][a-z]+[.][a-z]{2,3}")]],
    currentAddress: ['', [Validators.required]],
    permanentAddress: ['', [Validators.required]],
  username: ['', [Validators.required]],
  designation: ['', [Validators.required]],
  location: ['', [Validators.required]],
    });

 }
 get f() { return this.updateForm.controls; }

     formSubmit(employee:Employee)
     {
   
       this.employee = {...employee}
        
       if (this.empId) {
        console.log("id>.." + this.employee.id)
        //swal fire code starts here
   
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            //Logic for Update
            this.empService.updateEmployee(this.employee, this.employee.id)
              .subscribe((result) => {
                this.ngOnInit();
              });
          } else if(result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
    }


     }


     selectFile(event: any): void {
      this.selectedFiles = event.target.files;
    }


     uploadFile() {
     
      this.errorMsg = '';

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
  
          this.docService.upload(this.currentFile,this.empId).subscribe(
            (event: any) => {
             
              this.ngOnInit()
              Swal.fire({
                position:'top',
               icon: 'success',
               title: 'File Uploaded!!',
               showConfirmButton: false,
               timer: 1500
             })
            
            });
            (err: any) => {
              console.log(err);
             
              this.currentFile = undefined;
            }
          
        }
  
        this.selectedFiles = undefined;
      }
    }
     
    downloadFile(filename: string): void {
      this.comDocService.download(filename).subscribe((event) => {
        saveAs(event, filename);
      });
      (error: HttpErrorResponse) => {
        console.log(error);
      };
    }
  

    uploadDetailsForm(){
      console.log("file upload.....................")
      this.errorMsg = '';
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
  
          this.docService.uploadDetailsForm(this.currentFile,this.empId).subscribe(
            (event: any) => {
              this.ngOnInit();
              Swal.fire({
                position:'top',
               icon: 'success',
               title: 'File Uploaded!!',
               showConfirmButton: false,
               timer: 1500
             })
            },
            (err: any) => {
              console.log(err);
              
  
              this.currentFile = undefined;
            }
          );
        }
  
        this.selectedFiles = undefined;
      }
    }

     downloadDetailsForm(filename:string):void
     {
      this.docService.downloadDetailsForm(filename).subscribe((event) => {
        saveAs(event, filename);
      });
      (error: HttpErrorResponse) => {
        console.log(error);
      };
     }

     changePassword(emp){

      this.userService.changePassword(emp.oldPassword,emp.newPassword).subscribe((data)=>{
        alert("password changed!!")
      })
     }

     showBasicDialog() {
      this.displayBasic = true;
  }

    }
  

