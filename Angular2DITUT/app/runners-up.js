"use strict";
var core_1 = require('@angular/core');
exports.RUNNERS_UP = new core_1.OpaqueToken('RunnersUp');
function runnersUpFactory(take) {
    return function (winner, heroService) {
        /* ... */
        return heroService
            .getAllHeroes()
            .filter(function (hero) { return hero.name !== winner.name; })
            .map(function (hero) { return hero.name; })
            .slice(0, Math.max(0, take)) //Returns a section of an array
            .join(', ');
    };
}
exports.runnersUpFactory = runnersUpFactory;
;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=runners-up.js.map