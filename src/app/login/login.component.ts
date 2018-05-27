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

  checkLogin() {
    let user = this.loginService.getLoggedInUser(); // returns false if no user found in local storage
    if (user) {
      this.router.navigateByUrl("inbox");
    }
  }

  onFormSubmit(form: NgForm) {
    this.loginService.login(form.value.username, form.value.password).subscribe(response => {
      if (response) {
        localStorage.setItem('user', form.value.username);
        this.router.navigateByUrl("inbox");
      } else {
        console.log('fail');
        this.failedSignIn = true;
      }
    })
  }

}
