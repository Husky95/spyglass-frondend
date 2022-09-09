import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Goals } from '../models/goals.model';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  goalsServiceArray : Goals[] = []
  url: string = environment.GOALS_URI;
  http: HttpClient

  constructor(http: HttpClient,      
              private loginService: LoginService
    ) { 
    this.http = http

  }

  get(): Observable<any> {
    return this.http.get(this.url+`/all/${this.loginService.currentUsername}`,  {observe: 'response'});
    //return this.http.get(this.url+`/all`,  {observe: 'response'});

  }

  save(goal: any): Observable<any> {
    //return this.http.post(this.url+`/${this.loginService.currentUserID}`, goal,  {observe: 'response'});
    //return this.http.get(this.url+`/all/${this.loginService.currentUsername}`,  {observe: 'response'});

    return this.http.post(this.url, goal,  {observe: 'response'});
  }

  update(goal: any, id : number):  Observable<any> {
    return this.http.put(this.url +  `/${id}`, goal, { observe: 'response' });
  }

  delete(id : number) :  Observable<any> {
    console.log("delete " + id)
    return this.http.delete(this.url +  `/${id}`, { observe: 'response' } )

  }
}
