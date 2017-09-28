import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-login-div',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  notAllowed = false;

  constructor(public authService: AuthService, private router: Router) {

    this.authService.subject.subscribe(
      (user) => {
        if (user == null) {
          console.log('User null');
          this.notAllowed = false;
        } else if (!user.allowed) {
          console.log('User not allowed');
          this.notAllowed = true;
        } else {
          console.log('User bien');
          this.notAllowed = false;
        }
      });
  }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithGoogle();
  }

  lougOutFromGoogle() {
    window.open('https://accounts.google.com/Logout', '_blank');
  }

}
