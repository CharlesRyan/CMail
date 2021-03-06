import { Component, OnChanges, OnInit, Input, SimpleChange, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { MessageService } from "../message.service";
import { LoginService } from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("myForm")
  public myForm: NgForm;
  public form = {};
  public failedSignIn: boolean = false;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin(): void {
    let user = this.loginService.getUsername(); // returns username if found, false if not
    if (user) { // skip login screen if already logged in
      this.router.navigateByUrl("inbox");
    }
  }

  onFormSubmit(form: NgForm) {
    this.loginService.login(form.value.username, form.value.password).subscribe(response => {
      if (response) {
        this.loginService.setUsername(form.value.username);
        this.router.navigateByUrl("inbox");
      } else {
        this.failedSignIn = true;
      }
    })
  }

}
