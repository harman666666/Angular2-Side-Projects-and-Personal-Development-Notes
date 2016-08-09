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
// Promise Version
var core_1 = require('@angular/core');
var hero_service_promise_1 = require('./hero.service.promise');
var HeroListPromiseComponent = (function () {
    function HeroListPromiseComponent(heroService) {
        this.heroService = heroService;
        this.mode = 'Promise';
    }
    HeroListPromiseComponent.prototype.ngOnInit = function () { this.getHeroes(); };
    HeroListPromiseComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorMessage = error; });
    };
    HeroListPromiseComponent.prototype.addHero = function (name) {
        var _this = this;
        if (!name) {
            return;
        }
        this.heroService.addHero(name)
            .then(function (hero) { return _this.heroes.push(hero); }, function (error) { return _this.errorMessage = error; });
    };
    HeroListPromiseComponent = __decorate([
        core_1.Component({
            selector: 'hero-list-promise',
            templateUrl: 'app/toh/hero-list.component.html',
            providers: [hero_service_promise_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_promise_1.HeroService])
    ], HeroListPromiseComponent);
    return HeroListPromiseComponent;
}());
exports.HeroListPromiseComponent = HeroListPromiseComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-list.component.promise.js.map