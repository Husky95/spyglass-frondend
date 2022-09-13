import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoalComponent } from './goal/goal.component';
import { DialogComponent } from './dialog/dialog.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import { HomeComponent } from './home/home.component';
import { UpdateGoalComponent } from './update-goal/update-goal.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RequestInterceptor } from './request.interceptor';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    GoalComponent,
    DialogComponent,
    HomeComponent,
    UpdateGoalComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    MenubarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    SelectButtonModule,
    FileUploadModule,
    ToggleButtonModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
