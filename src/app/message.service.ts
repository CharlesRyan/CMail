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

deleteById(id){
  let url  = this.messagesUrl + id;
  console.log(url);
  let token = localStorage.getItem('token');
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Token ' + token
			})
		}
		return this.http.delete(url, httpOptions);
}

// getAllMessages() {
	getAllMessages() {
		let token = localStorage.getItem('token');
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Token ' + token
			})
		}
		return this.http.get(this.messagesUrl, httpOptions);
	}

}
