import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service"

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getInboxMessages();
  }

  getInboxMessages() {
    this.messageService.getAllMessages("inbox")
      .subscribe(
        data => {
          console.log(data)
          for (let item in data) {
            this.messages.push(data[item]);
          }
          this.messages = this.messages.slice().reverse();
        },
        err => console.log(err)
      );
  }

  delete(id) {
    this.messageService.deleteById(id)
      .subscribe(
        data => { // success, clear local messages and make another request
          this.messages = [];
          this.getInboxMessages();
        },
        err => console.log(err)
      );
  }
  
}
