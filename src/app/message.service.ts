import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MessageService {

  messagesUrl = "https://iostest.bixly.com/messages/";

  constructor(
    private http: HttpClient
  ) { }

  getHttpOptions() {
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    }
    return httpOptions;
  }

  postMessage(data) {
    let httpOptions = this.getHttpOptions();
    return this.http.post(
      this.messagesUrl,
      data,
      httpOptions
    )
  }

  deleteById(id) {
    let httpOptions = this.getHttpOptions();
    let url = this.messagesUrl + id;
    return this.http.delete(url, httpOptions);
  }

  getAllMessages(inboxOrSent) {
    let url;
    inboxOrSent === "inbox" ? url = this.messagesUrl : url = this.messagesUrl + "sent/"
    let token = localStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    }
    return this.http.get(url, httpOptions);
  }

}
