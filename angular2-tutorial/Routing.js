"use strict";
require('rxjs/RX'); //Import all of rxjs
//The Angular Component Router enables navigation from one view to the next as users perform application tasks
/*
Most routing applications should add a <base> element to the index.html as the first child in the <head> tag to tell the router how to compose navigation URLs.
If the app folder is the application root, as it is for our sample application, set the href value exactly as shown here.
<base href=".">

The Angular Component Router is an optional service that presents a particular component view for a given URL.
import { ROUTER_DIRECTIVES } from '@angular/router';

The application will have one router. When the browser's URL changes, the router looks for a corresponding Route from which it can determine the component to display.
A router has no routes until we configure it. The preferred way is to bootstrap our application with an array of routes using the provideRouter function.

import { provideRouter, RouterConfig } from '@angular/router';

export const routes: RouterConfig = [
  { path: 'crisis-center', component: CrisisCenterComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
We pass the configuration array to the provideRouter() function which returns (among other things) a configured Router service provider.
Finally, we export this provider in the APP_ROUTER_PROVIDERS array so we can simplify registration of router dependencies later in main.ts.
We don't have any other providers to register right now. But we will.

// main entry point
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { AppComponent }         from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS
])
.catch(err => console.error(err));

We add a RouterLink directive to the anchor tag and bind it to a template expression that returns an array of route link parameters
(the link parameters array). The router ultimately resolves that array into a URL and a component view.
We see such bindings in the following AppComponent template:


template: `
  <h1>Component Router</h1>
  <nav>
    <a [routerLink]="['/crisis-center']">Crisis Center</a>
    <a [routerLink]="['/heroes']">Heroes</a>
  </nav>
  <router-outlet></router-outlet>
`,


Router
Displays the application component for the active URL. Manages navigation from one component to the next.
RouterConfig
Contains an array of Routes, each mapping a URL path to a component.
Route
Defines how the router should navigate to a component based on a URL pattern. Most routes consist of a path and a component type.
RouterOutlet
The directive (<router-outlet>) that marks where the router should display a view.
RouterLink
The directive for binding a clickable HTML element to a route. Clicking an anchor tag with a routerLink directive that is bound to a Link Parameters Array triggers a navigation.
Link Parameters Array
An array that the router interprets into a routing instruction. We can bind a RouterLink to that array or pass the array as an argument to the Router.navigate method.
Routing Component
An Angular component with a *RouterOutlet* that displays views based on router navigations.
*/
//# sourceMappingURL=Routing.js.map