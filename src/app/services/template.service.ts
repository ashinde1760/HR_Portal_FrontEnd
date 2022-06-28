import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }

  upload(file: File) {
    const formData:any = new FormData();
   
       formData.append('file', file);
   
   
       let config = {
   
     };
   
 return this.http.post(`${environment.baseUrl}/template/upload`,formData)
   
    
     }


     downloadTemplate(filename: string){
      return this.http.get(`${environment.baseUrl}/template/download/${filename}`, {
        reportProgress: true,
        // observe: 'events',
        responseType: 'blob'
      });
    }


   public deletefile(id:any)
   {
    return this.http.delete(`${environment.baseUrl}/template/delete/${id}`);
   }

   public getall()
   {
     return this.http.get(`${environment.baseUrl}/template/load`);
   }
}
