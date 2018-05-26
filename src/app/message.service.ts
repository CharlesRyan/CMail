import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

import { ApplicationSettingsService } from "./application-settings.service";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MessageService {


  constructor(
    private http: HttpClient,
    private applicationSettingService: ApplicationSettingsService
  ) { }

  getRestUrl(suffix:string) {
    return this.applicationSettingService.getFirebaseRestUrl(suffix);
  }

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
      this.getRestUrl(''),
      data,
      httpOptions
    )
  }

  deleteById(id) {
    let httpOptions = this.getHttpOptions();
    let url = this.getRestUrl(id);
    return this.http.delete(url, httpOptions);
  }

  getAllMessages(inboxOrSent) {
    let url;
    inboxOrSent === "inbox" ? url = this.getRestUrl("") : url = this.getRestUrl("sent/");
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
