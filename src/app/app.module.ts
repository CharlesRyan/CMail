import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InboxComponent } from './inbox/inbox.component';
import { SentComponent } from './sent/sent.component';
import { ComposeComponent } from './compose/compose.component';
import { NavigationComponent } from './navigation/navigation.component';

import {LoginGuard} from './login-guard.service';
import {LoginService} from './login.service';
import {MessageService} from './message.service';
import { ApplicationSettingsService } from './application-settings.service';
import { DatePipe } from './date.pipe';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InboxComponent,
    SentComponent,
    ComposeComponent,
    NavigationComponent,
    DatePipe,
    RegisterComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    LoginGuard,
    LoginService,
    MessageService,
    ApplicationSettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
