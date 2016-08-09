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
/* tslint:disable:one-line:check-open-brace*/
var core_1 = require('@angular/core');
exports.TITLE = new core_1.OpaqueToken('title');
var core_2 = require('@angular/core');
var date_logger_service_1 = require('./date-logger.service');
var hero_1 = require('./hero');
var hero_service_1 = require('./hero.service');
var logger_service_1 = require('./logger.service');
var runners_up_1 = require('./runners-up');
var someHero = new hero_1.Hero(42, 'Magma', 'Had a great month!', '555-555-5555');
var template = "\n  <h3>{{title}}</h3>\n  <div>Winner: <strong>{{heroOfTheMonth.name}}</strong></div>\n  <div>Reason for award: <strong>{{heroOfTheMonth.description}}</strong></div>\n  <div>Runners-up: <strong id=\"rups1\">{{runnersUp}}</strong></div>\n\n  <p>Logs:</p>\n  <div id=\"logs\">\n    <div *ngFor=\"let log of logs\">{{log}}</div>\n  </div>\n  ";
var HeroOfTheMonthComponent = (function () {
    function HeroOfTheMonthComponent(logger, heroOfTheMonth, runnersUp, //Need to Inject these explicitely to use them
        title) {
        this.heroOfTheMonth = heroOfTheMonth;
        this.runnersUp = runnersUp;
        this.title = title;
        this.logs = [];
        this.logs = logger.logs;
        logger.logInfo('starting up');
    }
    HeroOfTheMonthComponent = __decorate([
        core_2.Component({
            selector: 'hero-of-the-month',
            template: template,
            providers: [
                { provide: hero_1.Hero, useValue: someHero },
                { provide: exports.TITLE, useValue: 'Hero of the Month' },
                { provide: hero_service_1.HeroService, useClass: hero_service_1.HeroService },
                { provide: logger_service_1.LoggerService, useClass: date_logger_service_1.DateLoggerService },
                { provide: date_logger_service_1.MinimalLogger, useExisting: logger_service_1.LoggerService },
                { provide: runners_up_1.RUNNERS_UP, useFactory: runners_up_1.runnersUpFactory(2), deps: [hero_1.Hero, hero_service_1.HeroService] }
            ]
        }),
        __param(2, core_2.Inject(runners_up_1.RUNNERS_UP)),
        //Need to Inject these explicitely to use them
        __param(3, core_2.Inject(exports.TITLE)), 
        __metadata('design:paramtypes', [date_logger_service_1.MinimalLogger, hero_1.Hero, String, String])
    ], HeroOfTheMonthComponent);
    return HeroOfTheMonthComponent;
}());
exports.HeroOfTheMonthComponent = HeroOfTheMonthComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-of-the-month.component.js.map