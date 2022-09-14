import { Component, OnInit } from '@angular/core';
import { Goals } from '../models/goals.model';
import { GoalsService } from '../services/goals.service';
import { GoalInterface } from '../GoalInterfaces.interfaces';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  goals: any ;
  goalArray : Goals[] = []
  totalAmounts : number = 0;
  totalDeposits : number = 0;
  totalGoals : number = 0;
  dayUntilExpired : any ; 

  constructor( private goalsService : GoalsService,) { }

  ngOnInit() {
    this.getGoals()
    this.goalsService.get().subscribe( 
      (response)=>{
        if (response.status === 200) {
          this.goals = response.body;
          console.log(this.goals)
        }
      });
  }

  getGoals(){
    this.goalsService.get().subscribe( 
      (response)=>{
        if (response.status === 200) {
          this.goals = response.body;
          this.goalArray = response.body;
          this.totalCompute(this.goalArray)
        }
      });
  }

  totalCompute( goals : any){
    let tempDate = 0;
    console.log(goals)
    for(let i = 0 ; i < goals.length; i++){
      this.totalAmounts += goals[i].targetAmount;
      this.totalDeposits += goals[i].currentAmount;
      tempDate = Date.parse(goals[i].targetDate);

      if(i === 0){this.dayUntilExpired = tempDate}
      if(this.dayUntilExpired < tempDate){ this.dayUntilExpired = tempDate}
    }
    this.totalGoals = goals.length;
    const currentDay = new Date().getTime();
    const diffTime = Math.abs(this.dayUntilExpired - currentDay);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));     
    this.dayUntilExpired = diffDays;
  }

}
