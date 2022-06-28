import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ComDocuments } from 'src/app/model/ComDocument';
import { Employee } from 'src/app/model/Employee';
import { ComDocumentService } from 'src/app/services/com-document.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { Intern } from 'src/app/model/Intern';
import { InternService } from 'src/app/services/intern.service';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/app/model/template';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-documentation-tab',
  templateUrl: './documentation-tab.component.html',
  styleUrls: ['./documentation-tab.component.css'],
  providers: [MessageService],

})
export class DocumentationTabComponent implements OnInit {
  
 
  employeeData:Employee[];
  employee:Employee;
  selectedFiles?: FileList;
  currentFile?: File;
   templateData:Template[];
  internData:Intern[];
  intern:Intern;

  message = '';
  errorMsg = '';
  tempId='';


  constructor(private empService:EmployeeService,private messageService:MessageService, private docsService:ComDocumentService,private internService:InternService, private templateService:TemplateService) { }
   
  ngOnInit(): void {
               
     this.empService.loadAllEmployee().subscribe((data:any)=>{
       this.employeeData = data;
     });

                
     this.internService.loadAllInterns().subscribe((data:any)=>{
      this.internData = data;
    });

    this.templateService.getall().subscribe((data:any)=>{
      this.templateData = data;
    });
        
  }

   //for searching 
   getEventValue($event:any) :string {
    return $event.target.value;
  } 

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

 

  uploadFile(id:any) {
    console.log("file upload.....................")
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.docsService.upload(this.currentFile,id).subscribe(
          (data: any) => {
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
            // if (err.error && err.error.responseMessage) {
            //   this.errorMsg = err.error.responseMessage;
            // } else {
            //   this.errorMsg = 'Error occurred while uploading a file!';
            // }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }

  downloadFile(filename: string): void {
    this.docsService.download(filename).subscribe((event) => {
      saveAs(event, filename);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }

  uploadFileIntern(id:any) {
    console.log("file upload.....................")
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.docsService.uploadFileToIntern(this.currentFile,id).subscribe(
          (event: any) => {
            this.ngOnInit();
            Swal.fire({
              position:'top',
             icon: 'success',
             title: 'Login Successfull!!',
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

  uploadTemplate(){
    console.log("file upload.....................")
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.templateService.upload(this.currentFile).subscribe(
          (data: any) => {
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
            // if (err.error && err.error.responseMessage) {
            //   this.errorMsg = err.error.responseMessage;
            // } else {
            //   this.errorMsg = 'Error occurred while uploading a file!';
            // }

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }

  downloadTemplate(filename:string)
  {
    this.templateService.downloadTemplate(filename).subscribe((event) => {
      saveAs(event, filename);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }
  
  deleteTemplate(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
    this.templateService.deletefile(id).subscribe((result) => {
          this.ngOnInit();
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  }
  }
  


