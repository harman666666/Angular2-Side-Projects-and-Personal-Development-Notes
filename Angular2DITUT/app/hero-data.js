"use strict";
var hero_1 = require('./hero');
var HeroData = (function () {
    function HeroData() {
    }
    HeroData.prototype.createDb = function () {
        var heroes = [
            new hero_1.Hero(1, 'Windstorm'),
            new hero_1.Hero(2, 'Bombasto'),
            new hero_1.Hero(3, 'Magneta'),
            new hero_1.Hero(4, 'Tornado')
        ];
        return { heroes: heroes };
    };
    return HeroData;
}());
exports.HeroData = HeroData;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-data.js.map