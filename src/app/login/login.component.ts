import { Component, OnChanges, OnInit, Input, SimpleChange, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { MessageService } from "../message.service";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("myForm")
	public myForm: NgForm;
	public room;
	public form = {};

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin(){
    let user = this.loginService.isLoggedIn();
    if(user) {
      this.router.navigateByUrl("inbox");
    }
  }

  onFormSubmit(form:NgForm){
    const user = {
      username: form.value.username,
      password: form.value.password
    };
    let loginRes = this.loginService.login(user); 
    console.log(loginRes, "login result in com");
  }

}
