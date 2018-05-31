import { Component, OnChanges, OnInit, Input, SimpleChange, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { MessageService } from "../message.service";
import { LoginService } from "../login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild("myForm")
  public myForm: NgForm;
  public form = {};
  public unExists:boolean = false;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  onFormSubmit(form: NgForm) {
    this.loginService.checkForUsername(form.value.username).subscribe(response => {
      if (response) { // true if username exists
        form.reset();
        this.unExists = true; // prompts to choose different username
      } else {
        // hash password here
        this.loginService.createUser(form.value.username, form.value.password);
        this.messageService.postWelcomeMessage(form.value.username);
        //log user in and go to inbox
        this.loginService.login(form.value.username, form.value.password).subscribe(response => {
          if (response) {
            this.loginService.setUsername(form.value.username);
            this.router.navigateByUrl("inbox");
          }
        })
      }
    });
  }

}
