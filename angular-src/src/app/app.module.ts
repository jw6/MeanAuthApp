import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessageModule } from 'angular-flash-message';

import { ValidateService } from './services/validate.service';
import { FlashMessage } from 'angular-flash-message/dist/flash-message';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';
const routes : Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent },
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'login', component: LoginComponent},
  {path:'profile', component: ProfileComponent,canActivate:[AuthGuard]}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessageModule,
    HttpModule,
    [RouterModule.forRoot(routes, {useHash: true})],
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
