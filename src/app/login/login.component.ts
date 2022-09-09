
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  model: any = {};
  sessionId: any = "";
  username: string = "";
  constructor(
      private router: Router,
      private http: HttpClient,
      private loginService: LoginService,
      private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }
  login(){
    this.loginService.login(this.model.username,this.model.password).subscribe(res => {
      if (res) {
        this.sessionId = res.body.sessionId;
        this.loginService.currentUsername = res.body.username;
        this.loginService.currentUserID = res.body.id;
        sessionStorage.setItem(
          'token',
          this.sessionId
        );
        //console.log(res)
        //console.log(this.loginService.currentUsername)
        //console.log(this.sessionId)
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Login Successfully'});

        this.router.navigate(['/home']); 
      } else {
          alert("Authentication failed.")
      }
    },
    (err)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Wrong Login Info'});
    });

  }
}