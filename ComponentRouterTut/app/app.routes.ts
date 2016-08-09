import { provideRouter, RouterConfig }  from '@angular/router';

import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { HeroesRoutes }       from './heroes/heroes.routes';

import { LoginRoutes,
         AUTH_PROVIDERS }     from './login.routes';

import { CanDeactivateGuard } from './interfaces';



//We flatten the HeroesRoutes into the routes array with the ES6 spread operator (...).

export const routes: RouterConfig = [
  ...HeroesRoutes,
  ...LoginRoutes,
  ...CrisisCenterRoutes
];

//We pass the route configuration to the provideRouter function which returns an array containing the configured Router service provider 
//... and some other, unseen providers that the routing library requires.
//We also need to add the Guard to our main APP_ROUTER_PROVIDERS so the Router can inject it during the navigation process.

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS,
  CanDeactivateGuard
];

