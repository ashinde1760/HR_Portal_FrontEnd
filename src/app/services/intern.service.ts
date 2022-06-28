import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Intern } from '../model/Intern';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  constructor(private http:HttpClient) { }


  public getAllInterns(){
    return this.http.get(`${environment.baseUrl}/intern/all`)
  }

  public deleteIntern(id:any){
    return this.http.delete(`${environment.baseUrl}/intern/${id}`)
  }

  public updateIntern(data:Intern,id:any){
    return this.http.put(`${environment.baseUrl}/intern/${id}`, data)
  }
  public loadAllInterns(){
    return this.http.get(`${environment.baseUrl}/intern/load`)
  }

  public registerIntern(data:any){
    return this.http.post(`${environment.baseUrl}/intern/register`,data)
  }

  public getIntern(id:any)
  {
    return this.http.get(`${environment.baseUrl}/intern/${id}`)
  }

  uploadProfilePic(profilePic: File,id:any) : Observable<HttpEvent<any>> {
    const formData:any = new FormData();
   
       formData.append('profilePic', profilePic);
   
       const req = new HttpRequest('PUT', `${environment.baseUrl}/intern/upload/${id}`, formData,{
         reportProgress: true,
         responseType: 'json',
       
       });
   
       return this.http.request(req);
     }
}
