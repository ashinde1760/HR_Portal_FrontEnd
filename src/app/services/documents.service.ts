import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http:HttpClient) { }

  upload(file:File,id:any) : Observable<HttpEvent<any>> {
    const formData:any = new FormData();
   
       formData.append('file', file);
   
   
       let config = {
   
     };
   
       const req = new HttpRequest('POST', `${environment.baseUrl}/documentation/upload/${id}`, formData,{
         reportProgress: true,
         responseType: 'json',
       
       });
   
       return this.http.request(req);
     }


     uploadToIntern(file:File,id:any) : Observable<HttpEvent<any>> {
      const formData:any = new FormData();
     
         formData.append('file', file);
     
     
         let config = {
     
       };
     
         const req = new HttpRequest('POST', `${environment.baseUrl}/documentation/upload/intern/${id}`, formData,{
           reportProgress: true,
           responseType: 'json',
         
         });
     
         return this.http.request(req);
       }

     download(filename: string){
      return this.http.get(`${environment.baseUrl}/documentation/download/${filename}`, {
        reportProgress: true,
        // observe: 'events',
        responseType: 'blob'
      });
    }

    // //uploading file to Intern.....................
    // uploadFileToIntern(file: File,id:any) : Observable<HttpEvent<any>> {
    //   const formData:any = new FormData();
     
    //      formData.append('file', file);
     
     
    //      let config = {
     
    //    };
     
    //      const req = new HttpRequest('POST', `${environment.baseUrl}/documentation/upload/intern/${id}`, formData,{
    //        reportProgress: true,
    //        responseType: 'json',
         
    //      });
     
    //      return this.http.request(req);
    //    }


    uploadDetailsForm(file: File,id:any) {
      const formData:any = new FormData();
     
         formData.append('file', file);
    
         const req = new HttpRequest('POST', `${environment.baseUrl}/details/upload/${id}`, formData,{
           responseType: 'json',
         
         });
     
         return this.http.request(req);
       }

       downloadDetailsForm(filename: string){
        return this.http.get(`${environment.baseUrl}/details/download/${filename}`, {
          reportProgress: true,
          // observe: 'events',
          responseType: 'blob'
        });
      }
  
}
