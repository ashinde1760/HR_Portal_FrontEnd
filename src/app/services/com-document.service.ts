import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComDocumentService {
  constructor(private http: HttpClient) {}

  upload(file: File, id: any): Observable<HttpEvent<any>> {
    const formData: any = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${environment.baseUrl}/docs/upload/${id}`,
      formData,
      {
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  download(filename: string) {
    return this.http.get(`${environment.baseUrl}/docs/download/${filename}`, {
      reportProgress: true,
      // observe: 'events',
      responseType: 'blob',
    });
  }

  //uploading file to Intern.....................
  uploadFileToIntern(file: File, id: any): Observable<HttpEvent<any>> {
    const formData: any = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${environment.baseUrl}/docs/upload/intern/${id}`,
      formData,
      {
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }
}
