import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

import { Goals } from './models/goals.model';
import { GoalsService } from './services/goals.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]

})
export class AppComponent {
  items!: MenuItem[];
  title = 'spyglass';
  constructor(){}

  ngOnInit() {
    this.items = [
       
        {
            label: 'Account',
            icon: 'pi pi-fw pi-user',
            items: [
                {label: 'Login', icon: 'pi pi-fw pi-trash'},
                {label: 'Logout', icon: 'pi pi-fw pi-refresh'}
            ]
        }
    ];
  }



}
