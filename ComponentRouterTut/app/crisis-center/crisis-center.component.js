"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var crisis_service_1 = require('./crisis.service');
/*
it is the root of the Crisis Center area just as AppComponent is the root of the entire application.
It is a shell for the crisis management feature area just as the AppComponent is a shell to manage the high-level workflow.
Unlike AppComponent (and most other components), it lacks a selector.
It doesn't need one. We don't embed this component in a parent template. We navigate to it from the outside, via the router.
*/
var CrisisCenterComponent = (function () {
    function CrisisCenterComponent() {
    }
    CrisisCenterComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>CRISIS CENTER</h2>\n    <router-outlet></router-outlet>\n  ",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [crisis_service_1.CrisisService]
        }), 
        __metadata('design:paramtypes', [])
    ], CrisisCenterComponent);
    return CrisisCenterComponent;
}());
exports.CrisisCenterComponent = CrisisCenterComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=crisis-center.component.js.map