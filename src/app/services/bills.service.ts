import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bills } from '../model/Bills';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

 

  constructor(private http:HttpClient) { }

  public getBills(){
    return this.http.get(`${environment.baseUrl}/bill/getall`)
  }

  public postBills(data:Bills){
    return this.http.post(`${environment.baseUrl}/bill/`, data)
  }

  upload(file: File, obj:any, id:any): Observable<HttpEvent<any>> {

    const json = JSON.stringify(obj);
const blob = new Blob([json], {
  type: 'application/json'
});
    const formData:any = new FormData();

    formData.append('file', file);
    formData.append('obj',blob);

    let config = {

  };

    const req = new HttpRequest('POST', `${environment.baseUrl}/bill/upload/${id}`, formData,{
      reportProgress: true,
      responseType: 'json',
    
    });

    return this.http.request(req);
  }

  download(filename: string){
    return this.http.get(`${environment.baseUrl}/bill/download/${filename}`, {
      reportProgress: true,
      // observe: 'events',
      responseType: 'blob'
    });
  }

  updateBills(id:any, data:Bills){
    return this.http.put(`${environment.baseUrl}/bill/`,data)
  }

  approveBills(id:any ,data:Bills, empId:any)
  {
    return this.http.put(`${environment.baseUrl}/bill/${id}/bill/${empId}`,data);
  }

}


