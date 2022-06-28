import { Component, OnInit } from '@angular/core';
import { Leave } from 'src/app/model/Leave';
import { EmployeeService } from 'src/app/services/employee.service';
import { InternService } from 'src/app/services/intern.service';
import { LeaveService } from 'src/app/services/leave.service';
import Swal from 'sweetalert2';

interface LeaveType {
  type: string;
}

@Component({
  selector: 'app-leave-tab',
  templateUrl: './leave-tab.component.html',
  styleUrls: ['./leave-tab.component.css']
})
export class LeaveTabComponent implements OnInit {

  invalidDates: Array<Date>
  leavesData!: Leave[];
  

  internId = '';
  name = '';

  selectedLeave: any;

  submitted?: boolean;
  leaveDialogue?: boolean;
  types: LeaveType[];

  leave: Leave = {
    numberOfLeave: '',
    fromDate: new Date(),
    toDate: new Date(),
    leavetype: '',
    reason: '',
    id: '',
  
  };

  constructor(
    private internService: InternService,
    private leaveService: LeaveService
  ) {
    this.types = [
      { type: 'Casual' },
      { type: 'Earned' },
      { type: 'Medical' },
    ];
  }

  ngOnInit(): void {
    this.internId = sessionStorage.getItem('empId');
    this.name = sessionStorage.getItem('loggedUser');
    this.leave.fromDate = new Date(this.leave.fromDate);
    this.internService.getIntern(this.internId).subscribe((data: any) => {
      this.leavesData = data.leaveList;
      console.log('Intern...................', data);
      console.log('Intern Leaves...................', this.leavesData);

    });
  }

  //for searching
  getEventValue($event: any): string {
    return $event.target.value;
  }

  formSubmit() {
    console.log('selected leave', this.selectedLeave);

    this.leave.leavetype = this.selectedLeave['type'];

    this.leaveService.addLeaveToIntern(this.leave, this.internId).subscribe(
      (data: any) => {
        console.log(data);
        // alert('success')
        this.ngOnInit();
        Swal.fire('Success!!', 'Leave Addes Successfully!!', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Something Went Wrong!!', 'error');
      }
    );
  }

  editIntern() {
    this.ngOnInit();
    this.leaveDialogue = true;
  }
  hideDialog() {
    this.leaveDialogue = false;
    this.submitted = false;
  }

  deleteLeaves(id:any){
    this.leaveDialogue = false;
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
               this.leaveService.deleteLeave(id).subscribe((result) => {
                 this.ngOnInit();
                 Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
               });
             }
           });
         }
       
  }


