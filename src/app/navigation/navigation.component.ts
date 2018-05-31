import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.user = this.loginService.getUsername();
  }

  logout() {
    this.loginService.logout();
  }
}
