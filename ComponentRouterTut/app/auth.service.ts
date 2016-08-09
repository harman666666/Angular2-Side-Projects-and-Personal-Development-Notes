import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


/*
The AuthGuard should call an application service that can login a user and retain information about the current user. Here's a demo AuthService:
Although it doesn't actually log in, it has what we need for this discussion. It has an isLoggedIn flag to tell us whether the user is authenticated. Its login method simulates an API call to an external service by returning an observable that resolves successfully after a short pause.
*/

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  login() {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout() {
    this.isLoggedIn = false;
  }
}


