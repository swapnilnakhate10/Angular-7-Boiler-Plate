import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions : any;

  constructor(private http: HttpClient) { 
    let token = 'Bearer ';
    this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': token
        })
      };    
  }

  get(url) {
     return this.http.get(url, this.httpOptions);
  }

  post(url , requestBody) {
     return this.http.post(url, requestBody, this.httpOptions);
  }

  put(url , requestBody) {
     return this.http.put(url, requestBody, this.httpOptions);
  }

  delete(url) {
     return this.http.delete(url, this.httpOptions);
  }
}
