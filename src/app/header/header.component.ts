import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: Boolean;
  public name: String;
  public email: String;

  constructor(public authService: AuthService) {

    this.authService.subject.subscribe(
      (user) => {
        if (user == null || !user.allowed) {
          this.isLoggedIn = false;
          this.name = '';
          this.email = '';
        } else {
          this.isLoggedIn = true;
          this.name = user.name;
          this.email = user.email;
        }
      });


    // this.authService.af.authState.subscribe(
    //   (auth) => {
    //     if (auth == null) {
    //       this.isLoggedIn = false;
    //       this.user_displayName = '';
    //       this.user_email = '';
    //     } else {
    //       this.isLoggedIn = true;
    //       this.user_displayName = auth.displayName;
    //       this.user_email = auth.email;
    //     }
    //   }
    // );


    // this.authService.af.authState.subscribe(
    //   (auth) => {
    //     if (auth != null) {
    //       const emailsArray = this.dbService.getEmails().split(',');
    //       if (emailsArray.includes(auth.email)) {
    //         this.notAllowed = false;
    //         this.router.navigate(['']);
    //       } else {
    //         this.notAllowed = true;
    //         this.authService.logout();
    //       }
    //     }
    //   });



  }

  login() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
