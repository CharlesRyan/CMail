import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from "../login.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input()
  user: string;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  // greet() {
  //   let check = this.loginService.getUsername();
  //   this.user = check === false ? 'Please Log In' : `Hello, ${check}`;
  // }

  logout() {
    this.loginService.logout();
  }
}
