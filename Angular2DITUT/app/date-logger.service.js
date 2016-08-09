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
/* tslint:disable:one-line:check-open-brace*/
var core_1 = require('@angular/core');
var logger_service_1 = require('./logger.service');
// class used as a restricting interface (hides other public members)
var MinimalLogger = (function () {
    function MinimalLogger() {
    }
    return MinimalLogger;
}());
exports.MinimalLogger = MinimalLogger;
/*
// Transpiles to:
  var MinimalLogger = (function () {
    function MinimalLogger() {}
    return MinimalLogger;
  }());
  exports("MinimalLogger", MinimalLogger);
 */
var DateLoggerService = (function (_super) {
    __extends(DateLoggerService, _super);
    function DateLoggerService() {
        _super.apply(this, arguments);
    }
    DateLoggerService.prototype.logInfo = function (msg) { _super.prototype.logInfo.call(this, stamp(msg)); };
    DateLoggerService.prototype.logDebug = function (msg) { _super.prototype.logInfo.call(this, stamp(msg)); };
    DateLoggerService.prototype.logError = function (msg) { _super.prototype.logError.call(this, stamp(msg)); };
    DateLoggerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DateLoggerService);
    return DateLoggerService;
}(logger_service_1.LoggerService));
exports.DateLoggerService = DateLoggerService;
function stamp(msg) { return msg + ' at ' + new Date(); }
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=date-logger.service.js.map