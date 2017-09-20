import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class DatabaseService {

  item: FirebaseObjectObservable<any>;
  allowedEmails: string;

  constructor(public afDB: AngularFireDatabase) {
    this.item = this.afDB.object('/mails', { preserveSnapshot: true });
    this.item.subscribe(snapshot => {
      this.allowedEmails = snapshot.val();
    });
  }

  getEmails(): string {
    return this.allowedEmails;
  }
}
