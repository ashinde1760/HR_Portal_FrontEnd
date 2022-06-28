import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Bills } from 'src/app/model/Bills';
import { Leave } from 'src/app/model/Leave';
import { Project } from 'src/app/model/Project';

import { BillsService } from 'src/app/services/bills.service';

import { LeaveService } from 'src/app/services/leave.service';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css'],

  providers: [MessageService],
})
export class WelcomeContentComponent implements OnInit {
  leavesData!: Leave[];
  leave!: Leave;
  singleLeave: any;
   visible = false;
   leaveAccept="Accepted";
   leaveReject = "Rejected";

  //for Bills Table
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  billsData!: Bills[];
  bill!: Bills;
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];
  billsDialogue?: boolean;

  //for project table
  projectData!: Project[];
  project!: Project;

  //for activation part
  checked1: boolean = true;
  loader: boolean = true;

  submitted?: boolean;
  projectDialogue?: boolean;
  clientEditDialogue?: boolean;

  selectedClients!: boolean;

  constructor(
    private leaveService: LeaveService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private projectService: ProjectService,
    private billService: BillsService
  ) {}

  ngOnInit(): void {
    //fetching data from leave for leave table
    this.leaveService.getAll().subscribe((data: any) => {
      this.leavesData = data;
      this.leavesData.reverse();
      console.log(data);
    });

    //fetching data From project for project details table
    this.projectService.getAllProjects().subscribe((data: any) => {
      this.projectData = data;
      console.log(this.projectData);
    });

    //fetching data from bill for bills details table
    this.billService.getBills().subscribe((data: any) => {
      this.billsData = data;
      console.log(this.billsData);
    });
  }
  //After Click on Accept Button
  leaveAccepted(leave: Leave, id: any) {
   
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');

        //updatating granted optiion logic
        this.leave = { ...leave };

        this.leave.grantedOption = 'Accepted';
        this.leave.comment = 'Accepted';
        
        if (this.leave.id) {
    

          this.leaveService
            .updateLeave(id, this.leave, this.leave.employeeId)
            .subscribe((result) => {
        
              console.log('status' + result);
              this.ngOnInit();
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  //for disable button


  //for rejecting leave
  leaveRejected(leave: Leave, id: any) {
    console.log(id);

    Swal.fire({
      title: 'Do you want to reject the leave request?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');

        //updatating granted optiion logic
        this.leave = { ...leave };
        console.log(this.leave.employeeId);
        this.leave.grantedOption = 'Rejected';
        // this.leaveService.getLeave(id).subscribe((data)=>{
        //   this.singleLeave = data;
        //   this.singleLeave.grantedOption = "Rejected";
        // })

        if (this.leave.id) {
          this.leaveService
            .updateLeave(id, this.leave, this.leave.employeeId)
            .subscribe((result) => {
              console.log('status' + result);
              this.ngOnInit();
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  hideloader() {
    this.loader = false;
  }

  // to open dialog box
  addProject() {
    this.project = {};
    this.submitted = false;
    this.projectDialogue = true;
  }

  //to hide dialog box
  hideDialog() {
    this.projectDialogue = false;
    this.submitted = false;
  }

  //save project information
  saveClient() {
    this.submitted = true;

    if (this.project.id) {
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
          this.projectService
            .editProject(this.project.id, this.project)
            .subscribe((result) => {
              this.ngOnInit();
            });
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } else {
      //code for Saving New Project
      this.projectService.postProject(this.project).subscribe((result) => {
        console.log('result:' + result);
        this.ngOnInit();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'project Added Successfully',
        });
      });
      this.projectDialogue = false;
    }
  }

  //Edit client information

  editClient(project: Project) {
    this.project = { ...project };
    // this.submitted=false;
    this.projectDialogue = true;
    console.log('Project:' + project);
    if(this.project.dateOfStarting)
    this.project.dateOfStarting = new Date (this.project.dateOfStarting);
    if(this.project.dateOfSubmission)
    this.project.dateOfSubmission = new Date (this.project.dateOfSubmission);
  }

  deleteClient(id: number) {
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
        console.log('id =' + id);
        this.projectService.deleteProject(id).subscribe((data) => {
          console.log(data);
          this.ngOnInit();
        });
      }
    });
  }

  //Bills table

  // uploadFile(bill:Bills){

  //   this.billService.postBills(bill);
  //   this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

  // }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFile(): void {
    this.errorMsg = '';
    const bill: Bills | null = this.bill;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file && bill) {
        this.currentFile = file;
;
             this.billsDialogue = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Bill Added Successfully',
            });
       
          (err: any) => {
            console.log(err);
            // if (err.error && err.error.responseMessage) {
            //   this.errorMsg = err.error.responseMessage;
            // } else {
            //   this.errorMsg = 'Error occurred while uploading a file!';
            // }

            this.currentFile = undefined;
          }
        
      }

      this.selectedFiles = undefined;
    }
  }

  downloadFile(filename: string): void {
    this.billService.download(filename).subscribe((event) => {
      saveAs(event, filename);
    });
    (error: HttpErrorResponse) => {
      console.log(error);
    };
  }

  //for Adding bill
  addBill() {
    this.bill = {};
    this.submitted = false;
    this.billsDialogue = true;
  }

  //to hide dialog box
  hideBillDialog() {
    this.billsDialogue = false;
    this.submitted = false;
  }

  saveBill() {
    this.submitted = true;
    this.billService.postBills(this.bill).subscribe((result) => {
      console.log('result:' + result);
      this.ngOnInit();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'project Added Successfully',
      });
    });
  }

  //for searching
  //for searching
  getEventValue($event: any): string {
    return $event.target.value;
  }


   //After Click on Accept Button
   billsAccepted(bill:Bills, id: any) {
   
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');

        //updatating granted optiion logic
        this.bill = { ...bill };

       
        this.bill.approveOption = 'Accepted';
        
        if (this.bill.billsId) {
    

          this.billService
            .approveBills(id, this.bill, this.bill.employeeId)
            .subscribe((result) => {
        
              console.log('status' + result);
              this.ngOnInit();
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }


  billsRejected(bill:Bills, id: any) {
    console.log(id);

    Swal.fire({
      title: 'Do you want to reject the leave request?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');

        //updatating granted optiion logic
        this.bill = { ...bill };
    
        this.bill.approveOption = 'Rejected';
        // this.leaveService.getLeave(id).subscribe((data)=>{
        //   this.singleLeave = data;
        //   this.singleLeave.grantedOption = "Rejected";
        // })

        if (this.bill.billsId) {
          this.billService
            .approveBills(id, this.bill, this.bill.employeeId)
            .subscribe((result) => {
              console.log('status' + result);
              this.ngOnInit();
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
