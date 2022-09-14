import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  title = 'spyglass';
  username! : string;
  @Input() homeFlag! : boolean;
  @Input() analyticsFlag! : boolean; // decorate the property with @Input()


  ngOnInit(): void {
    this.username = this.loginService.currentUsername;
  }
  changeActive(operation : string){
    if(operation === 'analytics'){ this.analyticsFlag = true; this.homeFlag = false}
    if(operation === 'home'){ this.analyticsFlag = false; this.homeFlag = true}
  }

}
