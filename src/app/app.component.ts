import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router) {

    this.authService.subject.subscribe(
      (user) => {
        if (user == null || !user.allowed) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['']);
        }
      });
  }


}
