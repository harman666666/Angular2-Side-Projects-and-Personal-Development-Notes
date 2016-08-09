// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';
/*
We're replacing the default XHRBackend, the service that talks to the remote server, with the in-memory web api service after priming it with the following in-memory-data.service.ts file:
*/
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data-service';


//The usual bootstrapping imports
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {Http, HTTP_PROVIDERS} from '@angular/http'
/*
ur app will depend upon the Angular http service which itself depends upon other supporting services.
The HTTP_PROVIDERS array from @angular/http library holds providers for the complete set of http services.
We should be able to access these services from anywhere in the application.
So we register them in the bootstrap method of main.ts where we launch the application and its root AppComponent.

Notice that we supply the HTTP_PROVIDERS in an array as the second parameter to the bootstrap method. This has the same effect the providers array in @Component metadata.

We generally recommend registering application-wide services in the root AppComponent providers. Here we're registering in main for a special reason.

Our application is in the early stages of development and far from ready for production. We don't even have a web server that can handle requests for heroes. Until we do, we'll have to fake it.

We're going to trick the http client into fetching and saving data from a demo/development service, the in-memory web api.

The application itself doesn't need to know and shouldn't know about this. So we'll slip the in-memory web api into the configuration above the AppComponent.
*/
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }      // in-mem server data
]);
