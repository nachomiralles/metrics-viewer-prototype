import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { AuthService } from './providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DatabaseService } from './providers/database.service';
import { StorageService } from './providers/storage.service';
import { MetricsResultComponent } from './metricsresult/metricsresult.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyB6U7D4Bb1NlcXXF-H9CMW75BXYhYoeScU',
  authDomain: 'metrics-viewer-prototype.firebaseapp.com',
  databaseURL: 'https://metrics-viewer-prototype.firebaseio.com',
  projectId: 'metrics-viewer-prototype',
  storageBucket: 'metrics-viewer-prototype.appspot.com',
  messagingSenderId: '660064549371'
};

const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembersComponent,
    HeaderComponent,
    FooterComponent,
    MetricsResultComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    HttpModule
  ],
  providers: [AngularFireAuth, AuthService, DatabaseService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
