import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service"

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages = [];
  public user:string;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getInboxMessages();
  }

  getInboxMessages() {
    this.user = localStorage.getItem('user');
    this.messageService.getAllMessages(`messages/${this.user}/inbox`)
      .subscribe(
        data => {
          this.messages = data.slice().reverse(); // keep the most recent in front
        },
        err => console.log(err)
      );
  }

  delete(id) {
    this.messageService.deleteById(`messages/${this.user}/inbox/${id}`)
      .subscribe(
        data => { // success, clear local messages and make another request
          // this.messages = [];
          this.getInboxMessages();
        },
        err => console.log(err)
      );
  }

}
