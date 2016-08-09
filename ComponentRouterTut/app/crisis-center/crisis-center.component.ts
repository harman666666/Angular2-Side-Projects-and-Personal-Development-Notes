import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';

import { CrisisService }        from './crisis.service';


/*
it is the root of the Crisis Center area just as AppComponent is the root of the entire application.
It is a shell for the crisis management feature area just as the AppComponent is a shell to manage the high-level workflow.
Unlike AppComponent (and most other components), it lacks a selector. 
It doesn't need one. We don't embed this component in a parent template. We navigate to it from the outside, via the router.
*/
@Component({
  template:  `
    <h2>CRISIS CENTER</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers:  [CrisisService]
})
export class CrisisCenterComponent { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/