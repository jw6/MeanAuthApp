import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

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
    private validateService: ValidateService
  ) { }

  username: String;
  password: String;
  
  ngOnInit() {
  }

  onLogin() {
    console.log(this.username)
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    // // Login
    this.authService.authenticateUser(user).subscribe(data => {
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
