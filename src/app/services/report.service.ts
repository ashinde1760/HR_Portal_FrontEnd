import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportData } from '../model/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  public getAllReports(){
    return this.http.get(`${environment.baseUrl}/report/getall`)
  }
  public updateReport(id:any ,data:ReportData, empId:any){
    return this.http.put(`${environment.baseUrl}/report/${id}/report/${empId}`,data)
    
  }

  public addReport(id:any,data:any)
  {
    return this.http.post(`${environment.baseUrl}/report/${id}`,data)
  }

  public addReportToIntern(id:any,data:any)
  {
    return this.http.post(`${environment.baseUrl}/report/intern/${id}`,data)
  }

}
