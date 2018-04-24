import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service"

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public messages = [];

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getSentMessages();
  }

  getSentMessages() {
    this.messageService.getAllMessages("sent")
      .subscribe(
        data => {
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
          this.getSentMessages();
        },
        err => console.log(err)
      );
  }
}
