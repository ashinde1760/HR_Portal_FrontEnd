import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Project } from '../model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor( private http:HttpClient) { }

  
  public getAllProjects(){
    return this.http.get(`${environment.baseUrl}/project/getall`)
}

public editProject(id:any,data:any)
{
 return this.http.put(`${environment.baseUrl}/project/`,data)
}

 //Add_post project data
 public postProject(data:Project){
  console.log(data)
  return this.http.post(`${environment.baseUrl}/project/`,data)

}

//delete project
public deleteProject(id:any){
  return this.http.delete(`${environment.baseUrl}/project/${id}`)
}
}
