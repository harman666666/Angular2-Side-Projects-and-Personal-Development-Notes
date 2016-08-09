import { bootstrap }        from '@angular/platform-browser-dynamic';
import { XHRBackend }       from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';

import { HeroData }         from './hero-data';
import { InMemoryBackendService,
         SEED_DATA }        from 'angular2-in-memory-web-api';

import { AppComponent }     from './app.component';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },

  { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
  { provide: SEED_DATA,  useClass: HeroData } // in-mem server data
]).catch((err: any) => console.error(err));
/*
    We can register certain module providers when bootstrapping rather than in the root application component.

We'd do this when we expect to select or configure external modules that support our application but (a)
    aren't conceptually part of the application and (b) that we could change later without altering the essential logic of the application.
For example, we might configure the Component Router with different location strategies based on environmental factors.
The choice of location strategy doesn't matter to the application itself.
*/
