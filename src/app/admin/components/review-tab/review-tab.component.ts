import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/model/Employee';
import { Intern } from 'src/app/model/Intern';
import { EmployeeService } from 'src/app/services/employee.service';
import { InternService } from 'src/app/services/intern.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-tab',
  templateUrl: './review-tab.component.html',
  styleUrls: ['./review-tab.component.css'],
  providers: [MessageService],
})
export class ReviewTabComponent implements OnInit {

  employeeData!:Employee[];
  employee!:Employee;

  internData!:Intern[];
  intern!:Intern;

  checked1: boolean = true;
  loader: boolean = true;

  submitted?: boolean;
  employeeDialogue?: boolean;
  internDialogue?:boolean;

  constructor(private empService:EmployeeService,private internService:InternService,private messageService:MessageService) { }

  ngOnInit(): void {

    this.empService.loadAllEmployee().subscribe((data:any)=>{
      this.employeeData = data;
        
      console.log(data);
            
    })
   
    this.internService.loadAllInterns().subscribe((data:any)=>{
      this.internData = data;
        
      console.log(data);
            
    })
    

  }
    
   //for searching 
   getEventValue($event:any) :string {
    return $event.target.value;
  } 

  updateEmployee() {
    this.submitted = true;

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
  
      this.employeeDialogue = false;
  }
}



  //for hiding intern list and showing intern form
  editEmployee(employee:Employee){
    this.employee = { ...employee };
    // this.submitted=false;
 
    this.employeeDialogue = true;
   
  }

  hideDialog() {
    this.employeeDialogue = false;
    this.submitted = false;
    this.internDialogue=false;
  }
   
  updateIntern(){
    this.submitted = true;

    if (this.intern.id) {
      console.log("id>.." + this.intern.id)
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
          this.internService.updateIntern(this.intern, this.intern.id)
            .subscribe((result) => {
              this.ngOnInit();
            });
        } else if(result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
  }else{
  
      this.internDialogue = false;
  }
  }

  editIntern(intern:Intern){
    this.intern = { ...intern };
    // this.submitted=false;
    this.internDialogue = true;
  

  }
  

}
