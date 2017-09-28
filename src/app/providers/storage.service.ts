import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import { AuthService } from '../providers/auth.service';
import 'rxjs/Rx';

@Injectable()
export class StorageService {
  storage = firebase.storage();
  storageRef = this.storage.ref('demo-data.json');
  public url: string;

  constructor(private http: Http, public authService: AuthService) {

    this.authService.subject.subscribe(
      (user) => {
        if (user != null && user.allowed) {
          this.storageRef.getDownloadURL().then(
            (url_2) => {
              console.log('URL_2: ' + url_2);
              this.url = url_2;
              console.log('URL: ' + this.url);
            });
        }
      });
  }

  getData() {
    return this.http.get(this.url).map(
      (res) => {
        return res.json();
      });
  }

}
