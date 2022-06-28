import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Leave } from '../model/Leave';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http:HttpClient) { }

    //get all leave
    public getAll(){
      
      return this.http.get(`${environment.baseUrl}/leave/getall`);
       
   }

   //Add_post leave data
   public postLeave(data:Leave){
     console.log(data)
     return this.http.post(`${environment.baseUrl}/leave/`,data)

   }
   updateLeave(id:any ,data:Leave, empId:any)
   {
     return this.http.put(`${environment.baseUrl}/leave/${id}/leave/${empId}`,data);
   }
 
 
   getLeave(leaveId:any){
      return this.http.get(`${environment.baseUrl}/leave/${leaveId}`);
   }

   addLeaveToEmployee(data:any,id:any)
   {
     return this.http.post(`${environment.baseUrl}/leave/${id}`,data)
   }
  
   deleteLeave(id:any)
   {
     return this.http.delete(`${environment.baseUrl}/leave/${id}`)
   }

   addLeaveToIntern(data:any,id:any)
   {
     return this.http.post(`${environment.baseUrl}/leave/intern/${id}`,data)
   }


}
