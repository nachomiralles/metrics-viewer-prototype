import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth.service';
import { DatabaseService } from '../providers/database.service';

@Component({
  selector: 'app-login-div',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  notAllowed = false;

  constructor(private dbService: DatabaseService, public authService: AuthService, private router: Router) {

    this.authService.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          const emailsArray = this.dbService.getEmails().split(',');
          if (emailsArray.includes(auth.email)) {
            this.router.navigate(['']);
          } else {
            console.log(this.notAllowed);
            this.showHideMessage(true);
            console.log(this.notAllowed);
            this.authService.logout();
          }
        }
      });
  }


  ngOnInit() {
  }

  login() {

    this.authService.loginWithGoogle();
  }

  showHideMessage(show: boolean) {
    console.log('Tengo:' + this.notAllowed);
    console.log('Me envian:' + show);
    this.notAllowed = show;
  }

}
