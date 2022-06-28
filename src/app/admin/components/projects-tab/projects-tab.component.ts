import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Project } from 'src/app/model/Project';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.css'],
  providers: [MessageService],
})
export class ProjectsTabComponent implements OnInit {

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

  constructor(private projectService:ProjectService, private messageService:MessageService) { }

  ngOnInit(): void {

          
    //fetching data From project for project details table
    this.projectService.getAllProjects().subscribe((data: any) => {
      this.projectData = data;
      console.log(this.projectData);
    });

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
        window.location.reload();
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

    //for searching
    getEventValue($event: any): string {
      return $event.target.value;
    }

}
