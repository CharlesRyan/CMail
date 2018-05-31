import { Component, OnChanges, OnInit, Input, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from "../login.service"
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  form: FormGroup;
  public unExists: boolean = true;
  public users = [];
  public dirUser;
  public replyReceiver: string = '';
  public replySubject: string = '';


  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      // receiver: [this.replyReceiver, Validators.required],
      // subject: [this.replySubject, Validators.required],
      receiver: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.checkReplyRedirect();

    this.loginService.getAllUsers() // populate user directory
      .subscribe(users => {
        for (let user in users) {
          this.users.push(user);
        }
      });
  }


  onFormSubmit({value, valid}): void {
    console.log(value);
    
    let date = new Date();
    let message = { // pull values from the form
      subject: value.subject,
      sent: date,
      sender: this.loginService.getUsername(),
      message: value.message,
      receiver: value.receiver
    };
    let data = JSON.stringify(message); // object => JSON

    // send if receiver exists in db
    this.loginService.checkForUsername(value.receiver).subscribe(response => {
      if (response) { // returns true if username exists
        this.messageService.postMessage(data);
        this.router.navigateByUrl("sent");
      } else {
        this.unExists = false;
      }
    });
  }

  fillInUser(event): void { // populates receiver field with username clicked in directory
    // this.dirUser = event.target.innerText;
    (<HTMLInputElement>document.getElementById('receiver')).value = event.target.innerText;
    console.log(this.dirUser);
  }

  checkReplyRedirect(): void {
    let receiver = localStorage.getItem('target');
    let subject = localStorage.getItem('subject');
    console.log(receiver);

    if (receiver) {
      this.replyReceiver = receiver;
      this.replySubject = `RE: ${subject}`;
    }
    localStorage.removeItem('target');
    localStorage.removeItem('subject');
  }

}
