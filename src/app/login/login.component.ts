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
  public form = {};
  public attemptedTresspassing:boolean;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin(){
    let user = this.loginService.isLoggedIn(); // returns false if no token found in local storage
    if(user) {
      this.router.navigateByUrl("inbox");
    }
  }

  onFormSubmit(form:NgForm){
    // object passed into function directly to avoid storing password in local memory
    this.loginService.login({ 
      username: form.value.username,
      password: form.value.password
    }); 
  }

}
