import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  http: HttpClient
  url: string = environment.SIGNUP_URI;

  constructor(http: HttpClient) { this.http = http}
  
  save(userInfo: any): Observable<any> {
    return this.http.post(this.url, userInfo,  {observe: 'response'});
  }

}
