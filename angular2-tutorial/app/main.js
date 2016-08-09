"use strict";
/*
bootstrap(AppComponent, [ HTTP_PROVIDERS ]);
 */
/*
We use the Angular Http client to communicate with a server using a familiar HTTP request/response protocol.
The Http client is one of a family of services in the Angular HTTP library.

SystemJS knows how to load services from the Angular HTTP library when we import from the @angular/http module because we registered that module name in the system.config file.

Before we can use the Http client , we'll have to register it as a service provider with the Dependency Injection system.
We prefer to register application-wide providers in the metadata providers array of the root AppComponent like this:
providers: [ HTTP_PROVIDERS ]
Here we register the providers in the bootstrap method in the main.ts file. Why?

This is a sample application that doesn't talk to a real server. We're going to reconfigure the (typically-hidden)
XhrBackend service with a fake provider that fetches and saves sample data from an in-memory data store.
This replacement service is called the in-memory web api.

We use the Angular Http client to communicate via XMLHttpRequest (XHR).
*/
//bootstrap(AppComponent, [
//    HTTP_PROVIDERS,
//    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
//    { provide: SEED_DATA, useClass: HeroData }                // in-mem server data
//]);
//# sourceMappingURL=main.js.map