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
var hero_service_1 = require('./hero.service');
var heroes_component_1 = require('./heroes.component');
var router_deprecated_1 = require('@angular/router-deprecated');
/*
We're ready to take the next step. Instead of displaying heroes automatically, we'd like to show them after the user clicks a button. In other words, we'd like to navigate to the list of heroes.

We'll need the Angular Component Router.

Set the base tag

Open the index.html and add <base href="/"> at the top of the <head> section.

<head>
  <base href="/">

Notice that we also removed the HeroesComponent from the directives array. AppComponent no longer shows heroes;
that will be the router's job. We'll soon remove <my-heroes> from the template too.

Notice the [routerLink] binding in the anchor tag. We bind the RouterLink directive (another of the ROUTER_DIRECTIVES)
to an array that tells the router where to navigate when the user clicks the link.
We define a routing instruction with a link parameters array. The array only has one element in our little sample, the quoted name of the route to follow.
Looking back at the route configuration, we confirm that 'Heroes' is the name of the route to the HeroesComponent
The browser's address bar shows /. The route path to HeroesComponent is /heroes, not /.
We don't have a route that matches the path /, so there is nothing to show. That's something we'll want to fix.
*/
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <a [routerLink]=\"['Heroes']\">Heroes</a>\n    <router-outlet></router-outlet>\n  ",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                hero_service_1.HeroService
            ]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/heroes',
                name: 'Heroes',
                component: heroes_component_1.HeroesComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component - Copy.js.map