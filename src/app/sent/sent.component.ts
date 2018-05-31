import { Component, OnInit } from '@angular/core';
import { MessageService } from "../message.service"
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  public messages = [];
  public user;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.getSentMessages();
  }

  getSentMessages() {
    this.user = this.loginService.getUsername();
    this.messageService.getAllMessages(`messages/${this.user}/sent`)
      .subscribe(
        data => {
            this.messages = data.slice().reverse(); // keep the most recent on top
          },
        err => console.log(err)
      );
  }

  delete(id) {
    this.messageService.deleteMessageById(`messages/${this.user}/sent/${id}`)
      .subscribe(
        data => { 
          // success, load updated messages
          this.getSentMessages();
        },
        err => console.log(err)
      );
  }
}
