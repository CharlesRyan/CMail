import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

import { ApplicationSettingsService } from "./application-settings.service";

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MessageService {


  constructor(
    private http: HttpClient,
    private applicationSettings: ApplicationSettingsService,
    private db: AngularFireDatabase
  ) { }

  getRestUrl(suffix: string) {
    return this.applicationSettings.getFirebaseRestUrl(suffix);
  }

  postMessage(data) {
    let obj = JSON.parse(data); // make data digestible for Firebase

    this.db.list(`messages/${obj.receiver}/inbox`).push(obj); // send to recipient
    this.db.list(`messages/${obj.sender}/sent`).push(obj);    // add to sent box of sender
  }

  postWelcomeMessage(un) {
    let date = new Date();
    let data = {
      inbox: {
        0: {
          sender: 'CCR',
          receiver: un,
          sent: date.toString(),
          title: 'Welcome',
          body: `Welcome, ${un}, to my messaging app`
        }
      },
      sent: {
        0: {
          sender: 'CCR',
          receiver: un,
          sent: date.toString(),
          title: 'Welcome',
          body: `Welcome, ${un}, to my messaging app`
        }
      }
    };
    let messageRef = this.db.object(`messages/${un}`);
    messageRef.set(data)
      .then(_ => null)
      .catch(err => console.log(err, 'Error with welcome message'));
  }

  deleteById(suffix) {
    let url = this.getRestUrl(suffix);
    return this.http.delete(url);
  }

  getAllMessages(suffix) { // returns array of message objects
    return this.http.get(this.getRestUrl(suffix))
      .map(response => {
        // let messages:IMessage[] = [];             // todo- create message interface
        let messages = [];
				for (let message in response) {
					// affix the Firebase key to ID property
					response[message].id = message;
					// add to our array
					messages.push(response[message]);
				}
        return messages;
      });
  }

}
