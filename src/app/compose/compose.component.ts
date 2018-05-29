import { Component, OnChanges, OnInit, Input, SimpleChange, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

import { LoginService } from "../login.service"
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  @ViewChild("myForm")
  public myForm: NgForm;
  public form = {};
  public unExists: boolean = true;
  public users = [];
  public dirUser;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.getAllUsers() // populate user directory
      .subscribe(users => {
        for (let user in users) {
          this.users.push(user);
        }
      });
  }

  onFormSubmit(form: NgForm) {
    let date = new Date();
    let message = { // pull values from the form
      title: form.value.title,
      sent: date,
      sender: localStorage.getItem('user'),
      body: form.value.body,
      receiver: form.value.receiver
    };
    let data = JSON.stringify(message); // object => JSON

    // send if receiver exists in db
    this.loginService.checkForUsername(form.value.receiver).subscribe(response => {
      if (response) { // returns true if username exists
        this.messageService.postMessage(data);
        this.router.navigateByUrl("sent");
      } else {
        this.unExists = false;
      }
    });
  }

  fillInUser(event){
    this.dirUser = event.target.innerText;
    
  }
}
