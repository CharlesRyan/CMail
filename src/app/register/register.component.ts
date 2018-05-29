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
export class RegisterComponent implements OnInit {

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
      if (response) { // returns true if username exists
        form.reset();
        this.unExists = true;
      } else {
        // hash password here
        this.loginService.createUser(form.value.username, form.value.password);
        this.messageService.postWelcomeMessage(form.value.username);
        this.router.navigateByUrl("login");
      }
    });
  }

  ngOnInit() {
  }

}
