import { Component, OnChanges, OnInit, Input, SimpleChange, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { LoginService } from "../login.service";
import { MessageService } from "../message.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @ViewChild("cuForm")
  public cuForm: NgForm;

  @ViewChild("cpForm")
  public cpForm: NgForm;

  @ViewChild("duForm")
  public duForm: NgForm;

  public form = {};

  public user;
  public menuOpen: boolean = false;
  public currentMenu: string;
  public privacy: boolean = false;
  public success: boolean = false;
  public deletingUser: boolean = false;
  public changingPassword: boolean = false;
  public badPassword: boolean = false;

  constructor(
    private loginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.loginService.getUsername();
  }

  openMenu(action):void {
    if (this.menuOpen === true && this.currentMenu === action) {
      this.closeMenu();
      return; // don't execute open menu if same button pressed twice
    } else if (this.menuOpen === true) {
      this.closeMenu();
    }

    this.currentMenu = action; // remember whats open to enable toggling

    if (action === 'cp') {
      this.changingPassword = true;
      this.menuOpen = true;
    } else if (action === 'du') {
      this.deletingUser = true;
      this.menuOpen = true;
    } else if (action === 'pp') {
      this.privacy = true;
      this.menuOpen = true;
    } else if (action === 'su') {
      this.success = true;
      this.menuOpen = true;
    }
  }

  closeMenu():void {
    this.privacy = false;
    this.success = false;
    this.deletingUser = false;
    this.changingPassword = false;
    this.currentMenu = '';
    this.menuOpen = false;
    this.badPassword = false;
  }

  checkPassword(form: NgForm, cb:FunctionStringCallback):void { // calls cb if password matches
    this.loginService.login(this.user, form.value.password).subscribe(response => {
      if (response) {
        cb.call(this, form);
      } else {
        this.badPassword = true;
      }
    });
  }

  changePassword(form: NgForm):void {
    if (form.value.newPassword1 === form.value.newPassword2) {
      this.loginService.createUser(this.user, form.value.newPassword1);
      this.openMenu('su');
    } else {
      // error passwords must match
    }
  }

  deleteUser(form: NgForm):void {
    this.loginService.deleteUser(this.user); // user data
    this.messageService.deleteUser(this.user); // messages
    this.loginService.logout();
    this.router.navigateByUrl("login");
  }

}
