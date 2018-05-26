import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {
	constructor(
		private router: Router
	) { }

	canActivate() {
		// if (localStorage.getItem('token') != "0") {
            // logged in so return true
            return true;
        // }
 
        // not logged in- lightly chastise and redirect to login page
        // this.router.navigate(['/login/']);
        // return false;

	} 
}

