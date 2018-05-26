import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

import { ApplicationSettingsService } from "./application-settings.service";

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MessageService {


  constructor(
    private http: HttpClient,
    private applicationSettings: ApplicationSettingsService,
    private db: AngularFireDatabaseModule
  ) { }

  getRestUrl(suffix:string) {
    return this.applicationSettings.getFirebaseRestUrl(suffix);
  }

  postMessage(data) {
    return this.http.post(
      this.getRestUrl('sent'),
      data
    )
  }

  deleteById(id) {
    let url = this.getRestUrl(id);
    return this.http.delete(url);
  }

  getAllMessages(suffix) {    
    return this.http.get(this.getRestUrl(suffix))
			// .map(response => response.json())
			.map(response => {
				const rooms = [];
				for (let roomKey in response) {
					// affix the Firebase key to ID property
					response[roomKey].id = roomKey;
					// add to our array
					rooms.push(response[roomKey]);
				}
				return rooms;
			});
  }

}
