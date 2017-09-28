import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { User } from '../model/user';

@Injectable()
export class AuthService {

  public subject: Subject<User> = new Subject();

  constructor(public af: AngularFireAuth, public dbService: DatabaseService) {

    this.af.authState.subscribe(
      (auth) => {
        if (auth == null) {
          this.subject.next(null);
        } else {
            if (this.dbService.receivedEmails) {
              this._checkIfValid(this.dbService.getEmails(), auth);
            } else {
              this.dbService.emailsSubject.subscribe(
                (emails) => {
                  this._checkIfValid(emails, auth);
                });
            }
        }
      });
  }

  _checkIfValid (allowedMails, user) {
    if (allowedMails.includes(user.email)) {
      this.subject.next(this._createUser(user, true));
    } else {
      this.subject.next(this._createUser(user, false));
    }
  }

  _createUser (fu: firebase.User, allow: boolean): User {
    const user: User = new User();
    user.name = fu.displayName;
    user.email = fu.email;
    user.allowed = allow;
    return user;
  }

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.af.auth.signOut();
  }

}
