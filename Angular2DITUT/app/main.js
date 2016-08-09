"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var hero_data_1 = require('./hero-data');
var angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
var app_component_1 = require('./app.component');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
    { provide: http_1.XHRBackend, useClass: angular2_in_memory_web_api_1.InMemoryBackendService },
    { provide: angular2_in_memory_web_api_1.SEED_DATA, useClass: hero_data_1.HeroData } // in-mem server data
]).catch(function (err) { return console.error(err); });
/*
    We can register certain module providers when bootstrapping rather than in the root application component.

We'd do this when we expect to select or configure external modules that support our application but (a)
    aren't conceptually part of the application and (b) that we could change later without altering the essential logic of the application.
For example, we might configure the Component Router with different location strategies based on environmental factors.
The choice of location strategy doesn't matter to the application itself.
*/
//# sourceMappingURL=main.js.map