"use strict";
var crisis_detail_component_1 = require('./crisis-detail.component');
var crisis_list_component_1 = require('./crisis-list.component');
var crisis_center_component_1 = require('./crisis-center.component');
var crisis_admin_component_1 = require('./crisis-admin.component');
var interfaces_1 = require('../interfaces');
var auth_guard_1 = require('../auth.guard');
/*
each feature area in its own folder
each area with its own area root component
each area root component with its own router-outlet and child routes
area routes rarely (if ever) cross

=> Navgate to crisis.component

Notice that the parent /crisis-center route has a children property with an array of two routes. These two routes navigate to the two Crisis
Center child components, CrisisListComponent and CrisisDetailComponent.
There are some important differences in the treatment of these routes.
First, the router displays the components of these child routes in the RouterOutlet of the CrisisCenterComponent, not in the RouterOutlet of the AppComponent shell.
Second, the child paths extend the path of their parent route.
Normally paths that begin with / refer to the root of the application. Here they are appended to the path to the CrisisCenterComponent.
To write an URL that navigates to the CrisisListComponent, we'd append its child route path, /, to /crisis-center.
To write an URL that navigates to the CrisisDetailComponent, we'd append the child route path, /, followed by the crisis id, yielding something like:
localhost:3000/crisis-center/2


When the application launches, the initial URL in the browser bar is something like:
localhost:3000
We want the application to display the list of crises as it would if we pasted localhost:3000/crisis-center/ into the address bar. This is our intended default route.
We can arrange for that behavior in several ways. One way is to use a redirect to transparently navigate from one route to another.
Since we only want to redirect when our path specifically matches '', we've added an extra configuration to our route using terminal: true.
Mainly for redirects, the terminal property gives us more control over when the router should continue matching our URL against our defined routes.
{
  path: '',
  redirectTo: '/crisis-center',
  terminal: true
},

At the moment, any user can navigate anywhere in the application anytime.
That's not always the right thing to do.
We can add guards to our route configuration to handle these scenarios.
A guard's return value controls the router's behavior:
if it returns true, the navigation process continues
if it returns false, the navigation process stops and the user stays put
The guard can also tell the router to navigate elsewhere, effectively canceling the current navigation.
Accordingly, a routing guard can return an Observable<boolean> and the router will wait for the observable to resolve to true or `false.
The router supports two kinds of guards:
CanActivate to mediate navigation to a route.
CanDeactivate to mediate navigation away from the current route.
We can have multiple guards at every level of a routing hierarchy. The router checks the CanDeactive guards first, from deepest child route to the top. Then it checks the CanActivate guards from the top down to the deepest child route. If any guard returns false, pending guards that have not completed will be canceled, and the entire navigation is canceled.

The CanActivate guard is the tool to manage these navigation business rules regarding authentication..


*/
exports.CrisisCenterRoutes = [
    {
        path: '',
        redirectTo: '/crisis-center',
        terminal: true
    },
    {
        path: 'crisis-center',
        component: crisis_center_component_1.CrisisCenterComponent,
        children: [
            {
                path: 'admin',
                //Currently every route within our Crisis Center is open to everyone. The new admin feature should be accessible only to authenticated users.
                //we'll write a CanActivate guard to redirect anonymous users to the login page when they try to reach the admin component.
                component: crisis_admin_component_1.CrisisAdminComponent,
                canActivate: [auth_guard_1.AuthGuard] /// => Look at this
            },
            /*
      What do we do about unapproved, unsaved changes when the user navigates away?
      We can't just leave and risk losing the user's changes; that would be a terrible experience.
      We'd like to pause and let the user decide what to do. If the user cancels, we'll stay put and allow more changes.
      If the user approves, the app can save. => Crisis Detail Component
            */
            {
                path: ':id',
                component: crisis_detail_component_1.CrisisDetailComponent,
                canDeactivate: [interfaces_1.CanDeactivateGuard] //Found in interfaces
            },
            {
                path: '',
                component: crisis_list_component_1.CrisisListComponent
            }
        ]
    }
];
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-center.routes.js.map