import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { documents } from 'src/app/model/documents';
import { Employee } from 'src/app/model/Employee';
import { DocumentsService } from 'src/app/services/documents.service';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-tab',
  templateUrl: './emp-tab.component.html',
  styleUrls: ['./emp-tab.component.css'],
  providers: [MessageService],
})
export class EmpTabComponent implements OnInit {

  updateForm: FormGroup;
  employeeData!:Employee[];
  employee!:Employee;
  empTable=true;
  empDetails=false;
  checked1: boolean = true;
  loader: boolean = true;
  documents:documents[];
  submitted?: boolean;
  employeeDialogue?: boolean;
  selectedFiles?: FileList;
  currentFile?: File;
  errorMsg: string;
  submitted1 = false;

  constructor(private empService:EmployeeService,private messageService:MessageService, private docsService:DocumentsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      
    this.empService.loadAllEmployee().subscribe((data:any)=>{
      this.employeeData = data;
        
      console.log(data);
            
    })


    this.updateForm = this.formBuilder.group({
   
    
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern("[\\d]{10}")]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9_.]+[@][a-z]+[.][a-z]{2,3}")]],
      department: ['', [Validators.required]],
      reportingTo: ['', [Validators.required]],
      });




  }
  get f() { return this.updateForm.controls; }

  deleteEmployee(id:any)
  {
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        this.empService.deleteEmployee(id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }

  //updating intern......
  updateEmployee() {
    this.submitted = true;
    this.submitted1 = true;
   
    if (this.updateForm.invalid) {
      return;
  }
  if(this.submitted1)
  {

    if (this.employee.id) {
      console.log("id>.." + this.employee.id)
      //swal fire code starts here
      this.hideDialog();
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
  }else{
      console.log("intern not added");
      this.employeeDialogue = false;
  }
}
}

  //for searching 
  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  //for hiding intern list and showing intern form
  editEmployee(employee:Employee){
    this.employee = { ...employee };
    // this.submitted=false;
    this.employeeDialogue = true;
    console.log("intern:" + employee);

    
    this.empService.getEmployee(this.employee.id).subscribe((data:any)=>{
      this.documents = data.documents;
    })
  }

  hideDialog() {
    this.employeeDialogue = false;
    this.submitted = false;
  }

  downloadFile(filename: string): void {
    this.docsService.download(filename).subscribe((event) => {
      saveAs(event, filename);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

   uploadDetailsForm(id:any){
    console.log("file upload.....................")
    this.errorMsg = '';

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.docsService.uploadDetailsForm(this.currentFile,id).subscribe(
          (event:any) => {
            this.ngOnInit();
            
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'File Uploaded!!',
            });
            
           
          },
          (error:any) => {
            console.log(error);

            this.currentFile = undefined;
          }
        );
      }

      this.selectedFiles = undefined;
    }
  }

   }




