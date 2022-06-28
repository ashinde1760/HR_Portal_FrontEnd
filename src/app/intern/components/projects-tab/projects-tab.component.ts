import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Project } from 'src/app/model/Project';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects-tab',
  templateUrl: './projects-tab.component.html',
  styleUrls: ['./projects-tab.component.css'],
  providers:[MessageService]
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
 

 //Edit client information

 editClient(project: Project) {
   this.project = { ...project };
   // this.submitted=false;
   this.projectDialogue = true;
   console.log('Project:' + project);
 }

 

   //for searching
   getEventValue($event: any): string {
     return $event.target.value;
   }


}

