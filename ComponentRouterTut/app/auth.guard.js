"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_service_1 = require('./auth.service');
var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    /*
    At the moment we're interested in seeing how guards work so our first version does nothing useful.
    It simply logs to console and returns true immediately, allowing navigation to proceed:
    
      canActivate() {
        console.log('AuthGuard#canActivate called');
        return true;
      }
    */
    //Auth Guard should atleast pretend to authenticate => go to AuthService
    AuthGuard.prototype.canActivate = function (
        // Not using but worth knowing about
        next, state) {
        if (this.authService.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login']);
        /*
        If the user is logged in, it returns true and the navigation continues.
        If the user is not logged in, we tell the router to navigate to a login page — a page we haven't created yet. This secondary navigation automatically cancels the current navigation; we return false just to be clear about that.
        => Look at login component
        */
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map