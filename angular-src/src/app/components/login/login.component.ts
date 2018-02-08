import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router         : Router,
    private flashMessage   : FlashMessage,
    private authService    : AuthService,
    private validateService: ValidateService,
    private loginService   : LoginService
  ) { }

  username: String;
  password: String;
  
  ngOnInit() {
  }

  onLogin() {
    console.log(this.username)
  }

  onLoginSubmit() {
    console.log(this.username);
    const user = {
      username: this.username,
      password: this.password
    }

    // // Login
    this.loginService.loginUser(user).subscribe(data => {
      if(!this.validateService.validateLogin(user)){
        this.flashMessage.danger("Please fill in all fields", {timeout: 6000});
        this.router.navigate(['login']);
      } else if(data.success && data.user != undefined) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.success("You are now logged in", {timeout: 6000});
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.danger(data.msg, {timeout: 6000});
        this.router.navigate(['login']);
      }
    });
  }

}
