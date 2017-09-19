import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { DatabaseService } from '../providers/database.service';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private dbService: DatabaseService) {
    console.log("Nacho");
    console.log(dbService.getItems());
    console.log("Miralles");
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
