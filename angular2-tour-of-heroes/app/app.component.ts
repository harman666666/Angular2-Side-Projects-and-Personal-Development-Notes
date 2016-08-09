import { Component }       from '@angular/core';
import { HeroService }     from './hero.service';
import { HeroesComponent } from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';


import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';


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

@Component({
    selector: 'my-app',
    template: `
 <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['Heroes']">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
`,
    directives: [ROUTER_DIRECTIVES], /*
    We import the type of the dependency we’re asking for, and annotate our dependency argument with it in our component’s constructor.
    Angular knows how to create and inject an object of type DataService, if we configure a provider for it.
    This can happen either in the bootstrapping process of our app, or in the component itself (both ways have different implications on the dependency’s life cycle and availability).
    */
    providers: [
        ROUTER_PROVIDERS,
        HeroService
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
    styles: [`
    h1 {
            font-size: 1.2em;
            color: #999;
            margin-bottom: 0;
        }
h2 {
            font-size: 2em;
            margin-top: 0;
            padding-top: 0;
        }
nav a {
            padding: 5px 10px;
            text-decoration: none;
            margin-top: 10px;
            display: inline - block;
            background-color: #eee;
            border-radius: 4px;
        }
nav a:visited, a:link {
            color: #607D8B;
        }
nav a:hover {
            color: #039be5;
            background-color: #CFD8DC;
        }
nav a.router - link - active {
            color: #039be5;
        }
`]
})

/*
The AppComponent doesn't have a router yet. We'll use the @RouteConfig decorator to simultaneously (a) assign a router to the component and (b) configure that router with routes.
Routes tell the router which views to display when a user clicks a link or pastes a URL into the browser address bar.

@RouteConfig takes an array of route definitions. We have only one route definition at the moment but rest assured, we'll add more.

This route definition has three parts:
path: the router matches this route's path to the URL in the browser address bar (/heroes).
name: the official name of the route; it must begin with a capital letter to avoid confusion with the path (Heroes).
component: the component that the router should create when navigating to this route (HeroesComponent).

If we paste the path, /heroes, into the browser address bar, the router should match it to the 'Heroes' route and display the HeroesComponent. But where?

We have to tell it where by adding <router-outlet> marker tags to the bottom of the template.
RouterOutlet is one of the ROUTER_DIRECTIVES. The router displays each component
immediately below the <router-outlet> as we navigate through the application.

We don't really expect users to paste a route URL into the address bar. We add an anchor tag to the template which, when clicked, triggers navigation to the HeroesComponent.
*/

 @RouteConfig([
        {
            path: '/heroes',
            name: 'Heroes',
            component: HeroesComponent
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
            component: DashboardComponent,
            useAsDefault: true
        },
        {
            /*
            The colon (:) in the path indicates that :id is a placeholder to be filled with a specific hero id when navigating to the HeroDetailComponent.
            */
            path: '/detail/:id',
            name: 'HeroDetail',
            component: HeroDetailComponent
        }
    ])

export class AppComponent {
    title = 'Tour of Heroes';
}