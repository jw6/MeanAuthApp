import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessage } from 'angular-flash-message';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router         : Router,
    private flashMessage   : FlashMessage,
    private authService    : AuthService
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.success("You are logged out", {timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }
}
