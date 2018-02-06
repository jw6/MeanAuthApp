import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  username: String;
  password: String;
  
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessage
  ) { }
 
  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
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
  }

}
