import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  model: any = {};
  username : any;
  emails: any;
  passwords: any;

  constructor(private signupService : SignupService, private messageService: MessageService,private router: Router) {}
  reactiveForm!: FormGroup;

  ngOnInit(): void {
    
  }
  

  register(): void {
    const username = this.model.username;
    const password = this.model.password;
    const responseObject = {username,password};
    console.log(responseObject)
    this.signupService.save(responseObject).subscribe( 
      (response)=>{
        if (response.status === 200) {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully Register'});
          this.router.navigate(['/login']); // define your component where you want to go.

        }

      },
      (error)=>{
        this.messageService.add({severity:'error', summary: 'ERROR', detail: 'Username already taken'});

      }
      );
  }

}
