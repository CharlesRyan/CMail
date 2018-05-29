import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service"

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public messages = [];
  public user:string;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getSentMessages();
  }

  getSentMessages() {
    this.user = localStorage.getItem('user');
    this.messageService.getAllMessages(`messages/${this.user}/sent`)
      .subscribe(
        data => {
            this.messages = data.slice().reverse(); // keep the most recent in front
          },
        err => console.log(err)
      );
  }

  delete(id) {
    this.messageService.deleteById(`messages/${this.user}/sent/${id}`)
      .subscribe(
        data => { // success, clear local messages and make another request
          // this.messages = [];
          this.getSentMessages();
        },
        err => console.log(err)
      );
  }
}
