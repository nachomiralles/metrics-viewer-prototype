import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseService {
  items: FirebaseListObservable<any>;
  constructor(public afDB: AngularFireDatabase) { }

  getItems(){
    return this.items;
  }

}
