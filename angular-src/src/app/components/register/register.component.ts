import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name    : String;
  email   : String;
  username: String;
  password: String;
  
  constructor(
    private validateService: ValidateService,
    private flashMessage   : FlashMessage,
    private authService    : AuthService,
    private router         : Router
  ) { }
 
  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name    : this.name,
      email   : this.email,
      username: this.username,
      password: this.password
    }
      // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.danger("Please fill in all fields", {timeout: 3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.danger("Please use a valid email", {timeout: 3000});
      return false;
    }  

    // Register 
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.success("You are now registered can log in", {timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.danger("Something went wrong", {timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
