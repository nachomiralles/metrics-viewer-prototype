import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;

  constructor(public authService: AuthService) {
    this.authService.af.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user_displayName = '';
          this.user_email = '';
        } else {
          console.log(auth);
          this.isLoggedIn = true;
          this.user_displayName = auth.displayName;
          this.user_email = auth.email;
        }
      }
    );
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
