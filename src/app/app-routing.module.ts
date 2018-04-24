import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import {InboxComponent} from "./inbox/inbox.component";
import { SentComponent } from "./sent/sent.component";
import { LoginComponent } from "./login/login.component";
import { ComposeComponent } from "./compose/compose.component";
import { LoginGuard } from "./login-guard.service";

const routes: Routes = [    {
  path: "",
  redirectTo: "login",
  pathMatch: "full"
},

{
  path: "login",
  component: LoginComponent
},
{
  path: "inbox",
  component: InboxComponent,
  canActivate: [LoginGuard]
},
{
  path: "sent",
  component: SentComponent,
  canActivate: [LoginGuard]
},
{
  path: "compose",
  component: ComposeComponent,
  canActivate: [LoginGuard]
},

{
  path: "**",
  pathMatch: "full",
  redirectTo: "inbox"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
	providers: [ LoginGuard ]
})
export class AppRoutingModule { }

export const routedComponents = [
  LoginComponent
];