import { Component, OnInit } from '@angular/core';
import { Report} from 'src/app/model/Report';
import { EmployeeService } from 'src/app/services/employee.service';

import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-tab',
  templateUrl: './report-tab.component.html',
  styleUrls: ['./report-tab.component.css']
})


export class ReportTabComponent implements OnInit {
  report:Report = {

    feedback:"",
    actionTaken:""

  };
   empId = "";

   reportData:Report[];
  
  constructor(private reportService:ReportService, private empService:EmployeeService) { }

  ngOnInit(): void {
    this.empId = sessionStorage.getItem('empId');
    this.empService.getEmployee(this.empId).subscribe((data: any) => {
      this.reportData = data.reportList;
    });
  }
  
      formSubmit(){
        this.reportService.addReport(this.empId, this.report).subscribe(
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


       //for searching
  getEventValue($event: any): string {
    return $event.target.value;
  }

}
