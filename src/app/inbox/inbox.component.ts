import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { MessageService } from "../message.service"
import { LoginService } from '../login.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messages = [];
  public user;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getInboxMessages();    
  }

  getInboxMessages(): void {
    this.user = this.loginService.getUsername();
    this.messageService.getAllMessages(`messages/${this.user}/inbox`)
      .subscribe(
        data => {
          this.messages = data.slice().reverse(); // keep the most recent on top
        },
        err => console.log(err)
      );
  }

  reply(target, subject) {
    localStorage.setItem('target', target);
    localStorage.setItem('subject', subject);
    this.router.navigateByUrl("compose");
  }

  delete(id: string): void {
    this.messageService.deleteMessageById(`messages/${this.user}/inbox/${id}`)
      .subscribe(
        data => {
          // success, update local messages
          this.getInboxMessages();
        },
        err => console.log(err)
      );
  }

}
