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
var hero_cache_service_1 = require('./hero-cache.service');
var HeroBioComponent = (function () {
    function HeroBioComponent(heroCache) {
        this.heroCache = heroCache;
    }
    HeroBioComponent.prototype.ngOnInit = function () { this.heroCache.fetchCachedHero(this.heroId); };
    Object.defineProperty(HeroBioComponent.prototype, "hero", {
        get: function () { return this.heroCache.hero; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], HeroBioComponent.prototype, "heroId", void 0);
    HeroBioComponent = __decorate([
        core_1.Component({
            selector: 'hero-bio',
            template: "\n    <h4>{{hero.name}}</h4>\n    <ng-content></ng-content>\n    <textarea cols=\"25\" [(ngModel)]=\"hero.description\"></textarea>",
            providers: [hero_cache_service_1.HeroCacheService]
        }), 
        __metadata('design:paramtypes', [hero_cache_service_1.HeroCacheService])
    ], HeroBioComponent);
    return HeroBioComponent;
}());
exports.HeroBioComponent = HeroBioComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-bio.component.js.map