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

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    let message = { // pull values from the form
      title: form.value.title,
      body: form.value.body,
      receiver: form.value.receiver
    };
    let data = JSON.stringify(message); // object => JSON

    this.messageService.postMessage(data).subscribe(
      data => {
        this.router.navigateByUrl("sent");
      },
      err => {
        alert("Message failed. Please check if the receiver field is valid.");
        console.log(err);
      }
    );
  }
}
