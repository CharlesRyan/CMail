import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class LoginService {

  username;
  token;
  tokenAuthUrl = "https://iostest.bixly.com/api-token-auth/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };
  _loggedInUser: Boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUser() {
    return this.username;
  }

  isLoggedIn() {
    // check local storage every time 
    localStorage.getItem('token') === "0" ? this._loggedInUser = false : this._loggedInUser = true;
    return this._loggedInUser;
  }

  logout() {
    localStorage.setItem('token', "0");
  }

  login(user) {
    this.username = user.username;
    if (!this.isLoggedIn()) {
      return this.http.post(this.tokenAuthUrl, user, this.httpOptions)
        .subscribe(data => {
          this.token = data;
          this.token = this.token.token.toString();
          if (this.token) { // successful login
            localStorage.setItem('token', this.token);
            this.router.navigateByUrl("inbox");
          }
        },
          err => {
            alert('Login Failed- username and/or password invalid')
            console.log(err);
          });
    }
  }
}
