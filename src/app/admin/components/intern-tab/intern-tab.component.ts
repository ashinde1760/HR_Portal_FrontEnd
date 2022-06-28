import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Intern } from 'src/app/model/Intern';
import { InternService } from 'src/app/services/intern.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-intern-tab',
  templateUrl: './intern-tab.component.html',
  styleUrls: ['./intern-tab.component.css'],
  providers: [MessageService],
})
export class InternTabComponent implements OnInit {
  updateForm: FormGroup;
  internData!:Intern[];
  intern!:Intern;
  internTable=true;
  internDetails=false;
  checked1: boolean = true;
  loader: boolean = true;
  submitted1 = false;
  submitted?: boolean;
  internDialogue?: boolean;
 
   //for fetching user from employee
   username:any;
  


  constructor(private formBuilder: FormBuilder, private internservice:InternService,private messageService:MessageService,private userService:UserService) { }

  ngOnInit(): void {

    this.internservice.loadAllInterns().subscribe((data:any)=>{
      this.internData = data;
        
      console.log(data);

      
    });

    this.updateForm = this.formBuilder.group({
   
    
      name: ['', [Validators.required, Validators.minLength(6)]],
      location: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern("[\\d]{10}")]],
      email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9_.]+[@][a-z]+[.][a-z]{2,3}")]],
      projectname: ['', [Validators.required]],
      mentor: ['', [Validators.required]],
      });



  }
  get f1() { return this.updateForm.controls; }

  deleteIntern(id:any)
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
        this.internservice.deleteIntern(id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }

  //updating intern......
  updateIntern() {
    this.submitted = true;
    this.submitted1 = true;
     if (this.updateForm.invalid) {
      return;
  }
  if(this.submitted1)
  {

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
          this.internservice
            .updateIntern(this.intern, this.intern.id)
            .subscribe((result) => {
              this.ngOnInit();
            });
        } else if(result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
  }else{
      console.log("intern not added");
      this.internDialogue = false;
  }
}
}

  //for searching 
  getEventValue($event:any) :string {
    return $event.target.value;
  } 

  //for hiding intern list and showing intern form
  editIntern(intern:Intern){
    this.intern = { ...intern };
    // this.submitted=false;
    this.internDialogue = true;
    console.log("intern:" + intern);
  }

  hideDialog() {
    this.internDialogue = false;
    this.submitted = false;
  }


}
