import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase/app";

import { ApplicationSettingsService } from "./application-settings.service";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class LoginService {

  private username;
  private users: Observable<any[]>;
  private _loggedInUser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private db: AngularFireDatabase,
    private applicationSettings: ApplicationSettingsService
  ) {

    this._loggedInUser = false;

  }

  getUser() {
    return this.username;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.applicationSettings.getFirebaseRestUrl("users"));
  }

  getLoggedInUser() {
    return localStorage.getItem('user');
  }

  checkForUsername(un) {
    let userList = this.getAllUsers()
      .map(users => {
        for (let user in users) {
          if (user === un) {
            return false;
          }
        }
        return true;
      });
    return userList;
  }

  createUser(un, pw) {
    // add username to user list and password as attribute 'pw' under username
    let passRef = this.db.list(`users`);
    passRef.update(un, { 'pw': pw });
  }

  logout() {
    this._loggedInUser = false;
    localStorage.removeItem('user');
  }

  login(un, pw) {
    let userList = this.getAllUsers()
      .map(users => {
        for (let user in users) {
          if ((user === un) && (users[user]['pw'] === pw)) {
            return true;
          };
        }
        return false;
      });
    return userList;
  }
}
