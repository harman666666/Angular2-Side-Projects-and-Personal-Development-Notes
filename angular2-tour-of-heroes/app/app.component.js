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
var dashboard_component_1 = require('./dashboard.component');
var hero_detail_component_1 = require('./hero-detail.component');
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

Although we display the details of a selected hero at the bottom of the HeroesComponent, we don't yet navigate to the HeroDetailComponent in the three ways specified in our requirements:

from the Dashboard to a selected hero.
from the Heroes list to a selected hero.
from a "deep link" URL pasted into the browser address bar.
Adding a 'HeroDetail' route seem an obvious place to start.

At the moment the parent HeroesComponent sets the component's hero property to a hero object with a binding like this.
<my-hero-detail [hero]="selectedHero"></my-hero-detail>
That clearly won't work in any of our routing scenarios. Certainly not the last one; we can't embed an entire hero object in the URL! Nor would we want to
*/
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Tour of Heroes';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n <h1>{{title}}</h1>\n  <nav>\n    <a [routerLink]=\"['Dashboard']\">Dashboard</a>\n    <a [routerLink]=\"['Heroes']\">Heroes</a>\n  </nav>\n  <router-outlet></router-outlet>\n",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                hero_service_1.HeroService
            ],
            /*
            We'd like to re-use the HeroService to populate the component's heroes array.
        
        Recall earlier in the chapter that we removed the HeroService from the providers array of the HeroesComponent and added it to the providers array of the top level AppComponent.
        
        That move created a singleton HeroService instance, available to all components of the application. Angular will inject HeroService and we'll use it here in the DashboardComponent.
            */
            /*
            The router-link-active class
        
        The Angular Router adds the router-link-active class to the HTML navigation element whose route matches the active route. All we have to do is define the style for it. Sweet!
            */
            styles: ["\n    h1 {\n            font-size: 1.2em;\n            color: #999;\n            margin-bottom: 0;\n        }\nh2 {\n            font-size: 2em;\n            margin-top: 0;\n            padding-top: 0;\n        }\nnav a {\n            padding: 5px 10px;\n            text-decoration: none;\n            margin-top: 10px;\n            display: inline - block;\n            background-color: #eee;\n            border-radius: 4px;\n        }\nnav a:visited, a:link {\n            color: #607D8B;\n        }\nnav a:hover {\n            color: #039be5;\n            background-color: #CFD8DC;\n        }\nnav a.router - link - active {\n            color: #039be5;\n        }\n"]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/heroes',
                name: 'Heroes',
                component: heroes_component_1.HeroesComponent
            },
            /*
            useAsDefault
        
            We want the app to show the dashboard when it starts and we want to see a nice URL in the browser address bar that says /dashboard.
            Remember that the browser launches with / in the address bar. We don't have a route for that path and we'd rather not create one.
        
            Fortunately we can add the useAsDefault: true property to the route definition and the router will display
            the dashboard when the browser URL doesn't match an existing route.
            */
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: dashboard_component_1.DashboardComponent,
                useAsDefault: true
            },
            {
                /*
                The colon (:) in the path indicates that :id is a placeholder to be filled with a specific hero id when navigating to the HeroDetailComponent.
                */
                path: '/detail/:id',
                name: 'HeroDetail',
                component: hero_detail_component_1.HeroDetailComponent
            }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map