import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/Report';
import { InternService } from 'src/app/services/intern.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback-tab',
  templateUrl: './feedback-tab.component.html',
  styleUrls: ['./feedback-tab.component.css']
})
export class FeedbackTabComponent implements OnInit {

  report:Report = {

    feedback:"",
    actionTaken:""

  };
   internId = "";

   reportData:Report[];
  
  constructor(private reportService:ReportService, private internService:InternService) { }

  ngOnInit(): void {
    this.internId = sessionStorage.getItem('empId');
    this.internService.getIntern(this.internId).subscribe((data: any) => {
      this.reportData = data.reportList;
    });
  }
  
      formSubmit(){
        this.reportService.addReportToIntern(this.internId, this.report).subscribe(
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