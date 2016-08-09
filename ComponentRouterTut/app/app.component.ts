import { Component }          from '@angular/core';


import { ROUTER_DIRECTIVES }  from '@angular/router';

import { DialogService }  from './dialog.service';
import { HeroService }    from './heroes/hero.service';

/*
<base href>
Most routing applications should add a <base> element to the index.html as the first child in the <head> tag to tell the 
router how to compose navigation URLs.
If the app folder is the application root, as it is for our sample application, set the href value exactly as shown here.
index.html (base href)
<base href=".">
The Component Router uses the browser's history.pushState for navigation.
We must add a <base href> element tag to the index.html to make pushState routing work. The browser also needs the base href value 
to prefix relative URLs when downloading and linking to css files, scripts, and images.

The application will have one router. When the browser's URL changes, the router looks for a corresponding Route from which it can determine the component to display.
A router has no routes until we configure it. The preferred way is to bootstrap our application with an array of routes using the provideRouter function.
In the following example, we configure our application with three route definitions. => Look at app.routes
*/

/*
The RouterConfig is an array of routes that describe how to navigate. Each Route maps a URL path to a component.
There are no leading slashes in our path. The router parses and builds the URL for us, allowing us to use relative and absolute 
paths when navigating between application views.
The :id in the third route is a token for a route parameter. In a URL such as /hero/42, "42" is the value of the id parameter. 
The corresponding HeroDetailComponent will use that value to find and present the hero whose id is 42. We'll learn more 
about route parameters later in this chapter.
We pass the configuration array to the provideRouter() function which returns (among other things) a configured Router service provider.
Finally, we export this provider in the APP_ROUTER_PROVIDERS array so we can simplify registration of router dependencies later in main.ts. 
We don't have any other providers to register right now. But we will.

 imporrrrt { provideRouter, RouterConfig } from '@angular/router';

export const routes: RouterConfig = [
  { path: 'crisis-center', component: CrisisCenterComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

Router Link and Router Outlet
displays the HeroListComponent in a RouterOutlet that we've placed in the host view's HTML.
We add a RouterLink directive to the anchor tag and bind it to a template expression 
that returns an array of route link parameters (the link parameters array). 
The router ultimately resolves that array into a URL and a component view.
A template may hold exactly one unnamed <router-outlet>. The router supports multiple named outlets, a feature we'll cover in future.

RouterLink-
The directive for binding a clickable HTML element to a route. Clicking an anchor tag with a 
routerLink directive that is bound to a Link Parameters Array triggers a navigation.
Link Parameters Array-	
An array that the router interprets into a routing instruction. We can bind a RouterLink to that array or pass the array as an argument to 
the Router.navigate method.
Routing Component-	
An Angular component with a *RouterOutlet* that displays views based on router navigations.

Suppose we click a crisis, make a change, but do not click either button. Maybe we click the browser back button instead. Maybe we click the "Heroes" link.
Do either. Up pops a dialog box.
We can say "OK" and lose our changes or click "Cancel" and continue editing.
The router supports a CanDeactivate guard that gives us a chance to clean-up or ask the user's permission before navigating away from the current view.



Take a look at the hero routes, crisis routes, the other routes files as well

*/


@Component({
  selector: 'my-app',

  /*
[routerLink]="[...]". We imported RouterLink from the router library.

The template expression to the right of the equals (=) returns a link parameters array.

A link parameters array holds the ingredients for router navigation:

the path of the route to the destination component
optional route and query parameters that go into the route URL
The arrays in this example each have a single string parameter, the path of a route that we configured earlier. We don't have route parameters yet.
  */
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/heroes']">Heroes</a>
      <a [routerLink]="['/crisis-center/admin']">Crisis Admin</a>
      <a [routerLink]="['/login']">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers:  [
    HeroService,
    DialogService
  ],
  directives: [ROUTER_DIRECTIVES] //RouterLink and RouterOutlet are directives in the ROUTER_DIRECTIVES collection. 
})
export class AppComponent {
}


/*
Milestone #4: Query Parameters
Sometimes we wish to add optional information to a route request. For example, the HeroListComponent doesn't need help to display a list of heroes. 
But it might be nice if the previously-viewed hero were pre-selected when returning from the HeroDetailComponent.
That becomes possible if we can include hero Magneta's id in the URL when we return from the HeroDetailComponent, a scenario we'll pursue in a moment.

Optional information takes other forms. Search criteria are often loosely structured, e.g., name='wind*'. Multiple values are common — after='12/31/2015' 
& before='1/1/2017' — in no particular order — before='1/1/2017' & after='12/31/2015' — in a variety of formats — during='currentYear' .

The URL query string is the ideal vehicle for conveying arbitrarily complex information during navigation. 
The query string isn't involved in pattern matching and affords enormous flexiblity of expression. Almost anything serializable can appear in a query string.

prefer a route parameter when

the value is required.
the value is necessary to distinguish one route path from another.
prefer a query parameter when

the value is optional.
the value is complex and/or multi-variate.



*/