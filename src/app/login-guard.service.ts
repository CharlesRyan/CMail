import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { LoginService } from "./login.service";

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    canActivate() {
        if (this.loginService.getLoggedInUser()) {  // todo: one line 
            console.log("Login Guard checking: ", true);
            return true;
        }

        console.log("Login Guard checking: ", false);
            return false;
    }
}

