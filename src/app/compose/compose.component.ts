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

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
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


  onFormSubmit({ value, valid }): void {
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
    this.form.patchValue({
      receiver: event.target.innerText
    })
  }

  checkReplyRedirect(): void {
    let receiver = localStorage.getItem('target');
    let subject = localStorage.getItem('subject');

    if (receiver) {
      this.form.setValue({
        receiver: receiver,
        subject: `RE: ${subject}`,
        message: ''
      })
    }
    localStorage.removeItem('target');
    localStorage.removeItem('subject');
  }

}
