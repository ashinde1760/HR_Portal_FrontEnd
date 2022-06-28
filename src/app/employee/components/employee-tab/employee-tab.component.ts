import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-tab',
  templateUrl: './employee-tab.component.html',
  styleUrls: ['./employee-tab.component.css'],
  providers: [MessageService],
})
export class EmployeeTabComponent implements OnInit {
     
  
  employeeData!:Employee[];
  employee!:Employee;
  empTable=true;
  empDetails=false;
  checked1: boolean = true;
  loader: boolean = true;

 

  submitted?: boolean;
  employeeDialogue?: boolean;

  constructor(private empService:EmployeeService,private messageService:MessageService) { }

  ngOnInit(): void {

    this.empService.loadAllEmployee().subscribe((data:any)=>{
      
      this.employeeData = data;
        
      console.log(data);
            
    })
  }



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

  }

  hideDialog() {
    this.employeeDialogue = false;
    this.submitted = false;
  }


}
