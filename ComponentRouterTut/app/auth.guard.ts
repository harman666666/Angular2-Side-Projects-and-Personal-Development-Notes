import { Injectable }             from '@angular/core';
import { CanActivate,
         Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { AuthService }            from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

/*
At the moment we're interested in seeing how guards work so our first version does nothing useful. 
It simply logs to console and returns true immediately, allowing navigation to proceed:

  canActivate() {
    console.log('AuthGuard#canActivate called');
    return true;
  }
*/

//Auth Guard should atleast pretend to authenticate => go to AuthService

  canActivate(
    // Not using but worth knowing about
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isLoggedIn) { return true; }
    this.router.navigate(['/login']);
    /*
    If the user is logged in, it returns true and the navigation continues.
    If the user is not logged in, we tell the router to navigate to a login page — a page we haven't created yet. This secondary navigation automatically cancels the current navigation; we return false just to be clear about that.
    => Look at login component
    */
    return false;
  }
}
