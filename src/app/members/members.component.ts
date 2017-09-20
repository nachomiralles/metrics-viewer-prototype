import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { DatabaseService } from '../providers/database.service';
import {FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { Item } from '../model/item';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit {


  constructor(private dbService: DatabaseService) {
  }

  ngOnInit() {
  }

}
