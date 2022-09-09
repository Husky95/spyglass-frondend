import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Goals } from '../models/goals.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalsService } from '../services/goals.service';
import {MessageService} from 'primeng/api';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.scss'],
  providers: [MessageService]

})
export class UpdateGoalComponent implements OnInit {

  name! : string;
  description!: string;
  target_date!: Date;
  target_amount! : number;
  current_amount! : number;

  goalForm: FormGroup | any;
  createFlag : boolean = true; 
  display: boolean = false;
  goalInfo : any;

  constructor(private formBuilder: FormBuilder, private goalsService : GoalsService, private messageService: MessageService, private loginService: LoginService) { }
  @Output("test") test : EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.initializeForms();
  }


  initializeForms(): void {
    this.goalForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      target_date: '',
      target_amount: ['', Validators.pattern('[0-9]+(.[0-9]{0,2})?$')],
      current_amount: ['', Validators.pattern('[0-9]+(.[0-9]{0,2})?$')],
      imageSrc: ['', Validators.required],
    })
  }

 
  showUpdateDialog() : void {
    this.display = true;
  }
  closeDialog() : void{
    this.display = false;
  }
  //take in a goal object
  updateDialog(updateGoal : Goals) : void{
    this.createFlag = false;
    this.goalForm = this.formBuilder.group({
      id : updateGoal.id,
      name: [updateGoal.name, Validators.required],
      description: [updateGoal.description, Validators.required],
      target_date: updateGoal.targetDate,
      target_amount: [updateGoal.targetAmount, Validators.pattern('[0-9]+(.[0-9]{0,2})?$')],
      current_amount: [updateGoal.currentAmount, Validators.pattern('[0-9]+(.[0-9]{0,2})?$')],
      imageSrc: [updateGoal.imageSrc, Validators.required],
    })

    this.showUpdateDialog();

  }
 
  onUpdateSubmit(){
    const id = this.goalForm.value.id;
    const name = this.goalForm.value.name;
    const description = this.goalForm.value.description;
    const targetDate = this.goalForm.value.target_date;
    const targetAmount = this.goalForm.value.target_amount;
    const currentAmount = this.goalForm.value.current_amount;
    const imageSrc = this.goalForm.value.imageSrc;
    const username = this.loginService.currentUsername;
    const userID = this.loginService.currentUserID;
    const responseObject = {name,description,targetDate,targetAmount,currentAmount,imageSrc,username,userID};
    this.goalInfo = responseObject;
    this.goalsService.update(this.goalInfo, this.goalForm.value.id).subscribe( 
      (response)=>{
        if (response.status === 201) {
          console.log(response.body)
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully Updated A Goal'});
          this.test.emit();

          this.closeDialog();
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid Goal , Try Again '});
        }
      });
  }

}
