import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-tab',
  templateUrl: './employee-tab.component.html',
  styleUrls: ['./employee-tab.component.css']
})
export class EmployeeTabComponent implements OnInit {

  constructor(private empService:EmployeeService) { }

  employeeData!:Employee[];
  ngOnInit(): void {

    this.empService.loadAllEmployee().subscribe((data:any)=>{
      
      this.employeeData = data;
        
      console.log(data);
            
    })
  }

   //for searching 
   getEventValue($event:any) :string {
    return $event.target.value;
  } 

}
