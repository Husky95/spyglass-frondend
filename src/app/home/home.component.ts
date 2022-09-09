import { Component, OnInit } from '@angular/core';
import { Goals } from '../models/goals.model';
import { GoalsService } from '../services/goals.service';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  goalArray : Goals[] = []
  constructor(private goalsService : GoalsService, private messageService: MessageService, private loginService:LoginService) { }
  

  items!: MenuItem[];
  title = 'spyglass';
  username! : string;

  ngOnInit(): void {
    this.getGoals()
    this.username = this.loginService.currentUsername;
    this.items = [
       
      {
          label: 'Account',
          icon: 'pi pi-fw pi-user',
          items: [
              {label: 'Logout', icon: 'pi pi-fw pi-refresh'}
          ]
      }

  ];

  }
  getGoals(){
    this.goalsService.get().subscribe( 
      (response)=>{
        if (response.status === 200) {
          this.goalArray = response.body;
          console.log(this.goalArray)
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'GET request faild to get Goals value'});
        }
      });
   
  }
  logout(){
    
  }
}
