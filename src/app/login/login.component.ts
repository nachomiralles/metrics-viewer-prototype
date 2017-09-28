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
          this.notAllowed = false;
        } else if (!user.allowed) {
          this.notAllowed = true;
        } else {
          this.notAllowed = false;
        }
      });
  }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithGoogle();
  }

}
