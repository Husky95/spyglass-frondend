import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics.component';
const routes: Routes = [

  { path: 'signup', component: SignupComponent },
  {path: '', canActivate:[AuthenticationGuard], children: [
    { path: 'home', component: HomeComponent },
    { path: 'analytics', component: AnalyticsComponent },

    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
  ]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
