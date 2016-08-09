"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var hero_service_1 = require('./hero.service');
/////// HeroesBaseComponent /////
var HeroesBaseComponent = (function () {
    function HeroesBaseComponent(heroService) {
        this.heroService = heroService;
    }
    HeroesBaseComponent.prototype.ngOnInit = function () {
        this.heroes = this.heroService.getAllHeroes();
        this.afterGetHeroes();
    };
    // Post-process heroes in derived class override.
    HeroesBaseComponent.prototype.afterGetHeroes = function () { };
    HeroesBaseComponent = __decorate([
        core_1.Component({
            selector: 'unsorted-heroes',
            template: "<div *ngFor=\"let hero of heroes\">{{hero.name}}</div>",
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], HeroesBaseComponent);
    return HeroesBaseComponent;
}());
exports.HeroesBaseComponent = HeroesBaseComponent;
/////// SortedHeroesComponent /////
var SortedHeroesComponent = (function (_super) {
    __extends(SortedHeroesComponent, _super);
    /*
    Users want to see the heroes in alphabetical order.
    Rather than modify the original component, we sub-class it and create a SortedHeroesComponent
    that sorts the heroes before presenting them. The SortedHeroesComponent
    lets the base class fetch the heroes. (we said it was contrived).

    Unfortunately, Angular cannot inject the HeroService directly into the base class.
    We must provide the HeroService again for this component,
    then pass it down to the base class inside the constructor.

    Now take note of the afterGetHeroes method.
    Our first instinct was to create an ngOnInit method in SortedHeroesComponent
    and do the sorting there. But Angular calls the derived class's ngOnInit before calling the base class's
    ngOnInit so we'd be sorting the heroes array before they arrived. That produces a nasty error.

    Overriding the base class's afterGetHeroes method solves the problem
    */
    function SortedHeroesComponent(heroService) {
        _super.call(this, heroService);
    }
    SortedHeroesComponent.prototype.afterGetHeroes = function () {
        this.heroes = this.heroes.sort(function (h1, h2) {
            return h1.name < h2.name ? -1 :
                (h1.name > h2.name ? 1 : 0);
        });
    };
    SortedHeroesComponent = __decorate([
        core_1.Component({
            selector: 'sorted-heroes',
            template: "<div *ngFor=\"let hero of heroes\">{{hero.name}}</div>",
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], SortedHeroesComponent);
    return SortedHeroesComponent;
}(HeroesBaseComponent));
exports.SortedHeroesComponent = SortedHeroesComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=sorted-heroes.component.js.map