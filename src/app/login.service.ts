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

  isLoggedIn() {
    localStorage.getItem('token') === "0" ? this._loggedInUser = false : this._loggedInUser = true;
    console.log(localStorage.getItem('token'), "login check");
    
    console.log(this._loggedInUser, "login check");

    return this._loggedInUser;
  }

  logout() {
    localStorage.setItem('token', "0");
  }

  login(user) {
    if (!this.isLoggedIn()) {
      return this.http.post(this.tokenAuthUrl, user, this.httpOptions)
        .subscribe(data => {
          this.token = data;
          this.token = this.token.token.toString();
          if (this.token) {
            // this._loggedInUser = true;
            localStorage.setItem('token', this.token);
            this.router.navigateByUrl("inbox");
          }
        },
          err => alert('Login Failed- username and/or password invalid'));
    }
  }
}
