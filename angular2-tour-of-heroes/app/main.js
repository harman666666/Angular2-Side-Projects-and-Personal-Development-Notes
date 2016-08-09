"use strict";
// Imports for loading & configuring the in-memory web api
var http_1 = require('@angular/http');
/*
We're replacing the default XHRBackend, the service that talks to the remote server, with the in-memory web api service after priming it with the following in-memory-data.service.ts file:
*/
var angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
var in_memory_data_service_1 = require('./in-memory-data-service');
//The usual bootstrapping imports
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var http_2 = require('@angular/http');
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
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    http_2.HTTP_PROVIDERS,
    { provide: http_1.XHRBackend, useClass: angular2_in_memory_web_api_1.InMemoryBackendService },
    { provide: angular2_in_memory_web_api_1.SEED_DATA, useClass: in_memory_data_service_1.InMemoryDataService } // in-mem server data
]);
//# sourceMappingURL=main.js.map