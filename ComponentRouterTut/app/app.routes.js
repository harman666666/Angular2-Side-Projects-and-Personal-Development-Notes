"use strict";
var router_1 = require('@angular/router');
var crisis_center_routes_1 = require('./crisis-center/crisis-center.routes');
var heroes_routes_1 = require('./heroes/heroes.routes');
var login_routes_1 = require('./login.routes');
var interfaces_1 = require('./interfaces');
//We flatten the HeroesRoutes into the routes array with the ES6 spread operator (...).
exports.routes = heroes_routes_1.HeroesRoutes.concat(login_routes_1.LoginRoutes, crisis_center_routes_1.CrisisCenterRoutes);
//We pass the route configuration to the provideRouter function which returns an array containing the configured Router service provider 
//... and some other, unseen providers that the routing library requires.
//We also need to add the Guard to our main APP_ROUTER_PROVIDERS so the Router can inject it during the navigation process.
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes),
    login_routes_1.AUTH_PROVIDERS,
    interfaces_1.CanDeactivateGuard
];
//# sourceMappingURL=app.routes.js.map