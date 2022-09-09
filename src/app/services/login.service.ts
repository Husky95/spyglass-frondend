import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = environment.LOGIN_URI;
  http: HttpClient
  sessionId: any = "";
  currentUsername: string = "";
  currentUserID! : number 


  constructor(http: HttpClient) { 
    this.http = http
  }

  login(inputUsername : string , inputPassword : string) :  Observable<any>  { 
    return this.http.post<any>(this.url, {username: inputUsername,password: inputPassword},  { observe: 'response' })
  }


}
