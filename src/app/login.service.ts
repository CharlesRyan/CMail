import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase/app";
import * as shajs from 'sha.js';

import { ApplicationSettingsService } from "./application-settings.service";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class LoginService {

  private users: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private db: AngularFireDatabase,
    private applicationSettings: ApplicationSettingsService
  ) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.applicationSettings.getFirebaseRestUrl("users"));
  }

  getUsername() {// returns username if found, false if not
    let user = localStorage.getItem('user');
    return user !== null ? user : false;
  }

  setUsername(un: string) {
    localStorage.setItem('user', un);
  }

  checkForUsername(un) {
    let userList = this.getAllUsers()
      .map(users => {
        for (let user in users) {
          if (user === un) {
            return true;
          }
        }
        return false;
      });
    return userList;
  }

  hashPassword(pw){
    let hash = shajs('sha256').update(pw).digest('hex');
    return hash;
  }

  createUser(un, pw) {
    // add username to user list and password as attribute 'pw' under username
    let hash = this.hashPassword(pw);
    let passRef = this.db.list(`users`);
    passRef.update(un, { 'pw': hash });
  }

  deleteUser(user) {
    const itemsRef = this.db.list('users');
    itemsRef.remove(user);
  }

  logout() {
    localStorage.removeItem('user');
  }

  login(un, pw) {
    let hash = this.hashPassword(pw);
    let userList = this.getAllUsers()
      .map(users => {
        for (let user in users) {
          if ((user === un) && (users[user]['pw'] === hash)) {
            return true;
          };
        }
        return false;
      });
    return userList;
  }
}
