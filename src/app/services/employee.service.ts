import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  public getAllEmployee(){
    return this.http.get(`${environment.baseUrl}/emp/all`)
  }

  public deleteEmployee(id:any){
    return this.http.delete(`${environment.baseUrl}/emp/${id}`)
  }

  public loadAllEmployee(){
    return this.http.get(`${environment.baseUrl}/emp/load`)
  }
  public updateEmployee(data:any,id:any){
    return this.http.put(`${environment.baseUrl}/emp/${id}`,data)
  }

 public getEmployee(id:any)
 {
   return this.http.get(`${environment.baseUrl}/emp/${id}`)
 }


  uploadProfilePic(profilePic: File,id:any) : Observable<HttpEvent<any>> {
    const formData:any = new FormData();
   
       formData.append('profilePic', profilePic);
   
       const req = new HttpRequest('PUT', `${environment.baseUrl}/emp/upload/${id}`, formData,{
         reportProgress: true,
         responseType: 'json',
       
       });
   
       return this.http.request(req);
     }

}
  

