import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Goals } from '../models/goals.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalsService } from '../services/goals.service';
import {MessageService} from 'primeng/api';
import { LoginService } from '../services/login.service';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { ImageService } from '../services/image.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [MessageService]

})


export class DialogComponent implements OnInit {
  name! : string;
  description!: string;
  target_date!: Date;
  target_amount! : number;
  current_amount! : number;
  stateOptions!: any[];
  value1!: string ;
  imageUploadeDisplay : boolean = false;
  imageURLDisplay : boolean = true;
  uploadedFiles: any[] = [];
  checked1: boolean = false;
  imageS3URL : string = "";
  localUpload : boolean = false;

  goalForm: FormGroup | any;
  goalInfo : any;

  createFlag : boolean = true; 
  display: boolean = false;

  dialogGoal : Goals = new Goals(-1, "", "", new Date("2014-01-16"),NaN, NaN," "," ",-1 )
  @Output("getGoals") getGoals : EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private goalsService : GoalsService, private messageService: MessageService, private loginService:LoginService, private primeNGConfig: PrimeNGConfig, private imageService:ImageService) { 
    this.stateOptions = [
      { label: 'URL', value: 'true' },
      { label: 'Image', value: 'false' },
    ];
  }

 
  ngOnInit(): void {
    this.primeNGConfig.ripple = true;

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

  resetValue() : void{
    this.initializeForms();

  }
  showCreateDialog() : void {
    this.createFlag = true;
    this.resetValue();
    this.display = true;
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
      target_amount: [updateGoal.currentAmount, Validators.pattern('[0-9]+(.[0-9]{0,2})?$')],
      current_amount: [updateGoal.targetAmount, Validators.pattern('[0-9]+(.[0-9]{0,2})?$')],
      imageSrc: [updateGoal.imageSrc, Validators.required],
    })

    this.showUpdateDialog();
    
    //this.dialogGoal.name = updateGoal.name;
    //this.dialogGoal.description = updateGoal.description;
    //this.target_amount = updateGoal.target_amount;
    //this.current_amount = updateGoal.current_amount;
  }
  onCreateSubmit(){
    const name = this.goalForm.value.name;
    const description = this.goalForm.value.description;
    const targetDate = this.goalForm.value.target_date;
    const targetAmount = this.goalForm.value.target_amount;
    const currentAmount = this.goalForm.value.current_amount;
    let imageSrc = this.goalForm.value.imageSrc;
    if(this.localUpload === true){
      imageSrc = this.imageS3URL;
      this.localUpload = false
    }
    const username = this.loginService.currentUsername;
    const userID = this.loginService.currentUserID;
    const responseObject = {name,description,targetDate,targetAmount,currentAmount,imageSrc,username,userID};
    this.goalInfo = responseObject;
    this.goalsService.save(this.goalInfo).subscribe( 
      (response)=>{
        if (response.status === 201) {
          console.log(response.body)
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully Created A Goal'});
          this.getGoals.emit();
          this.closeDialog();
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid Goal , Try Again '});
        }
      });
  }

  onUpdateSubmit(){
    const id = this.goalForm.value.id;
    const name = this.goalForm.value.name;
    const description = this.goalForm.value.description;
    const targetDate = this.goalForm.value.target_date;
    const targetAmount = this.goalForm.value.target_amount;
    const currentAmount = this.goalForm.value.current_amount;
    const imageSrc = this.goalForm.value.imageSrc;
    const responseObject = {name,description,targetDate,targetAmount,currentAmount,imageSrc};
    this.goalInfo = responseObject;
    //TODO add PUT service
    this.goalsService.update(this.goalInfo, this.goalForm.value.id).subscribe( 
      (response)=>{
        if (response.status === 201) {
          console.log(response.body)
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Successfully Updated A Goal'});
          this.closeDialog();
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Invalid Goal , Try Again '});
        }
      });
  }
  onUpload(event :any) {
    //console.log(this.uploadedFiles);
    //console.log(event.files)
    this.imageService.imageUpload(event.files[0]).subscribe( 
      (response)=>{
          console.log(response.body.imageURL)
          this.imageS3URL = response.body.imageURL;
          this.localUpload = true;
          this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      });

}
uploadSelect(){
  
  this.checked1 = !this.checked1;
  if(this.checked1 == true){
    this.imageUploadeDisplay = true;
    this.imageURLDisplay = false
  }
  else{
    this.imageURLDisplay = true;
    this.imageUploadeDisplay = false;
  }
  console.log(this.checked1)

}

}
