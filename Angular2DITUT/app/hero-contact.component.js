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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var hero_cache_service_1 = require('./hero-cache.service');
var logger_service_1 = require('./logger.service');
var HeroContactComponent = (function () {
    /*
    The @Host() function decorating the heroCache property ensures that we get a reference to the cache service from the parent HeroBioComponent.
    Angular throws if the parent lacks that service, even if a component higher in the component tree happens to have that service.

A second @Host() function decorates the loggerService property.
    We know the only LoggerService instance in the app is provided at the AppComponent level.
    The host HeroBioComponent doesn't have its own LoggerService provider.

Angular would throw an error if we hadn't also decorated the property with the @Optional() function.
    Thanks to @Optional(), Angular sets the loggerService to null and the rest of the component adapts.
    */
    function HeroContactComponent(heroCache, loggerService) {
        this.heroCache = heroCache;
        this.loggerService = loggerService;
        this.hasLogger = false;
        if (loggerService) {
            this.hasLogger = true;
            loggerService.logInfo('HeroContactComponent can log!');
        }
    }
    Object.defineProperty(HeroContactComponent.prototype, "phoneNumber", {
        get: function () { return this.heroCache.hero.phone; },
        enumerable: true,
        configurable: true
    });
    HeroContactComponent = __decorate([
        core_1.Component({
            selector: 'hero-contact',
            template: "\n  <div>Phone #: {{phoneNumber}}\n  <span *ngIf=\"hasLogger\">!!!</span></div>"
        }),
        __param(0, core_1.Host()),
        __param(1, core_1.Host()),
        // limit search for logger; hides the application-wide logger
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [hero_cache_service_1.HeroCacheService, logger_service_1.LoggerService])
    ], HeroContactComponent);
    return HeroContactComponent;
}());
exports.HeroContactComponent = HeroContactComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-contact.component.js.map