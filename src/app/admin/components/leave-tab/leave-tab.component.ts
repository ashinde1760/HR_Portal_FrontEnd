import { Component, OnInit } from '@angular/core';
import { Toast } from 'primeng/toast';
import { EmpLeave, Leaves } from 'src/app/model/Employee';
import { InternLeave } from 'src/app/model/Intern';
import { Leave } from 'src/app/model/Leave';
import { EmployeeService } from 'src/app/services/employee.service';
import { InternService } from 'src/app/services/intern.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-leave-tab',
  templateUrl: './leave-tab.component.html',
  styleUrls: ['./leave-tab.component.css'],
})
export class LeaveTabComponent implements OnInit {
  empLeaveData!: EmpLeave[];
  employeeLeave: EmpLeave;
  checked1: boolean = true;
  loader: boolean = true;

  submitted?: boolean;
  employeeDialogue?: boolean;

  Leave: Leaves;

  leaveList: any[];
  nol: any[] = [];
  nol1: any[] = [];
  nol2: any[] = [];

  internLeaveData!: InternLeave[];
  internLeave: InternLeave;

  numberOfLeave: any;
  totalEarnedLeave: number;
  totalCasualLeave: number;
  totalSickLeave: number;
  totalLeaves: number;
  totalInternLeaves: number;


  constructor(
    private employeeService: EmployeeService,
    private internService: InternService
  ) {}

  ngOnInit(): void {
    this.totalCasualLeave = 0;
    this.totalSickLeave = 0;
    this.totalEarnedLeave = 0;
    this.totalLeaves = 0;
    this.totalInternLeaves = 0;
    this.numberOfLeave = 0;
    this.employeeService.loadAllEmployee().subscribe((data: any) => {
      this.empLeaveData = data;

      console.log("employeeData", this.empLeaveData);

      this.empLeaveData.map((item)=> console.log(item.leaveList?.[0]?.numberOfLeave,"leave list array"))
      // this.empLeaveData.forEach((item) => {
      //   console.log('LeaveList:', item.leaveList);
      //   item.leaveList.forEach((result) => {
      //     if (result.leavetype === 'casual') {
      //       console.log(result, 'all leave data');
      //       this.nol.push(result.numberOfLeave);
      //       console.log(this.nol);
      //     } else if (result.leavetype === 'medical') {
      //       console.log(result, 'all leave data');
      //       this.nol1.push(result.numberOfLeave);
      //       console.log(this.nol);
      //     } else if (result.leavetype === 'earned') {
      //       console.log(result, 'all leave data');
      //       this.nol2.push(result.numberOfLeave);
      //       console.log(this.nol);
      //     }
      //   });

      //   for (let i = 0; i < this.nol.length; i++) {
      //     this.totalCasualLeave = this.totalCasualLeave + this.nol[i];
      //   }
      //   console.log(this.totalCasualLeave, 'total casual leaves');

      //   for (let i = 0; i < this.nol1.length; i++) {
      //     this.totalSickLeave = this.totalSickLeave + this.nol1[i];
      //   }
      //   console.log(this.totalSickLeave, 'total sick leaves');

      //   for (let i = 0; i < this.nol2.length; i++) {
      //     this.totalEarnedLeave = this.totalEarnedLeave + this.nol2[i];
      //   }
      //   console.log(this.totalEarnedLeave, 'total Earned leaves');

      //   //total leaves addition
      //   this.totalLeaves =
      //     this.totalCasualLeave + this.totalSickLeave + this.totalEarnedLeave;
      // });


    });

    //for fetching data of intern List
    this.internService.loadAllInterns().forEach((data: any) => {
      this.internLeaveData = data;
    });
   
   


  }

  
  //for searching
  getEventValue($event: any): string {
    return $event.target.value;
  }

 
  
}


