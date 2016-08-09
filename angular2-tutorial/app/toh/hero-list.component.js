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
// Observable Version
var core_1 = require('@angular/core');
var hero_service_1 = require('./hero.service');
var HeroListComponent = (function () {
    function HeroListComponent(heroService) {
        this.heroService = heroService;
        this.mode = 'Observable';
    }
    /*
    Angular injects a HeroService into the constructor and the component calls that service to fetch and save data.
    The component does not talk directly to the Angular Http client!
    The component doesn't know or care how we get the data. It delegates to the HeroService.
    */
    HeroListComponent.prototype.ngOnInit = function () { this.getHeroes(); };
    /*
    The service's getHeroes() and addHero() methods return an Observable of hero data that the Angular Http client fetched from the server.
Observables are a big topic, beyond the scope of this chapter. But we need to know a little about them to appreciate what is going on here.
We should think of an Observable as a stream of events published by some source. We listen for events in this stream by subscribing to the Observable.
    In these subscriptions we specify the actions to take when the web request produces a success event
    (with the hero data in the event payload) or a fail event (with the error in the payload).

The subscribe method returns a Subscription. A Subscription is not another Observable.
It's the end of the line for observables. We can't call map on it or call subscribe again.
The Subscription object has a different purpose, signified by its primary method, unsubscribe.
    */
    HeroListComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .subscribe(function (heroes) { return _this.heroes = heroes; }, function (error) { return _this.errorMessage = error; });
        /*
        , we supply the subscribe function with a second function parameter to handle the error message.
        It sets an errorMessage variable which we've bound conditionally in the HeroListComponent template.
        */
    };
    HeroListComponent.prototype.addHero = function (name) {
        var _this = this;
        if (!name) {
            return;
        }
        this.heroService.addHero(name)
            .subscribe(function (hero) { return _this.heroes.push(hero); }, function (error) { return _this.errorMessage = error; });
    };
    HeroListComponent = __decorate([
        core_1.Component({
            selector: 'hero-list',
            template: "\n<h1>Tour of Heroes ({{mode}})</h1>\n<h3>Heroes:</h3>\n<ul>\n  <li *ngFor=\"let hero of heroes\">\n    {{hero.name}}\n  </li>\n</ul>\nNew hero name:\n<input #newHeroName />\n<button (click)=\"addHero(newHeroName.value); newHeroName.value=''\">\n  Add Hero\n</button>\n<div class=\"error\" *ngIf=\"errorMessage\">{{errorMessage}}</div>\n\n",
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroListComponent);
    return HeroListComponent;
}());
exports.HeroListComponent = HeroListComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=hero-list.component.js.map