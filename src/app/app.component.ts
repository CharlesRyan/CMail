import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public user;

  constructor(
    private loginService: LoginService
  ){

  }

  changeOfRoutes() {
    let check = this.loginService.getUsername();
    this.user = check === false ? 'Please Log In' : `Hello, ${check}`;
  }
}
