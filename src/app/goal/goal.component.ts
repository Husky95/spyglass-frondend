import { PrimeNGConfig } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { UpdateGoalComponent } from '../update-goal/update-goal.component';
import { Goals } from '../models/goals.model';
import { GoalsService } from '../services/goals.service';
import { LoginService } from '../services/login.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  providers: [MessageService]

})
export class GoalComponent implements OnInit {
  @Input() id: number = -1;
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() targetDate!: Date 
  @Input() targetAmount: number = -1;
  @Input() currentAmount: number = -1;
  @Input() imageSrc: string = '';
  @ViewChild(UpdateGoalComponent) childDialog!: UpdateGoalComponent;
  @Output("getGoals") getGoals : EventEmitter<any> = new EventEmitter();
  
  result : Goals = new Goals(-1, " ", " ", new Date("2014-01-16"),-1, -1," ","",-1 )
  displayDeposit: boolean = false;
  percent: number = 0
  depositAmount : number = 0;

  constructor(private goalsService : GoalsService, private loginService: LoginService,  private messageService: MessageService,) { }
  ngOnInit(): void {
    this.percent = Math.round((this.currentAmount/this.targetAmount)*100)
  }

  updateGoal(id : number, name : string, description : string, targetDate : Date, targetAmount : number , currentAmount : number , imageSrc : string ){
    this.result.name = name;
    this.result.id = id;
    this.result.description = description;
    this.result.targetDate = targetDate;
    this.result.targetAmount = targetAmount;
    this.result.currentAmount = currentAmount;
    this.result.imageSrc = imageSrc;
    this.result.username = this.loginService.currentUsername;
    this.result.userID = this.loginService.currentUserID;
    console.log(this.result.name)    
  
    this.childDialog.updateDialog(this.result);

  }

  deleteGoal(id : number)
  {
    this.goalsService.delete(id).subscribe( 
      (response)=>{
        if (response.status === 200) {
          console.log(response.body)
          this.getGoals.emit();

        } else {
        }
      });
  }
  openDeposit(){
    this.displayDeposit = true;
  }
  closeDeposit(){
    this.displayDeposit = false;
  }
  deposit(depositAmount : number){
    console.log(depositAmount)

    let newAmount = Number(depositAmount)+Number(this.currentAmount);
    console.log(newAmount)
    let finalAmount = Math.round( newAmount * 1e2 ) / 1e2;
    this.result.name = this.name;
    this.result.id = this.id;
    this.result.description = this.description;
    this.result.targetDate = this.targetDate;
    this.result.targetAmount = this.targetAmount;
    this.result.currentAmount = finalAmount;
    this.result.imageSrc = this.imageSrc;
    this.result.username = this.loginService.currentUsername;
    this.result.userID = this.loginService.currentUserID;
    this.goalsService.update(this.result,this.id).subscribe( 
      (response)=>{
        if (response.status === 201) {
          console.log(response.body)
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Depost Successfully'});
          this.getGoals.emit();
          this.closeDeposit();
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Something Wrong , Try Again '});
        }
      });
  }
  test(){
    this.getGoals.emit();
  }



}
