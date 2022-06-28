import { Component, OnInit } from '@angular/core';
import { Intern } from 'src/app/model/Intern';
import { InternService } from 'src/app/services/intern.service';

@Component({
  selector: 'app-intern-tab',
  templateUrl: './intern-tab.component.html',
  styleUrls: ['./intern-tab.component.css']
})
export class InternTabComponent implements OnInit {

  internData!:Intern[];

  constructor(private internservice:InternService) { }

  ngOnInit(): void {

    this.internservice.loadAllInterns().subscribe((data:any)=>{
      this.internData = data;
        
      console.log(data);

      
    });
  }

     //for searching 
     getEventValue($event:any) :string {
      return $event.target.value;
    } 
  

}
