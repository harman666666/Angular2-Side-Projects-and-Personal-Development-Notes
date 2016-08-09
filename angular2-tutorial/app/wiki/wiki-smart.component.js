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
var http_1 = require('@angular/http');
var Subject_1 = require('rxjs/Subject');
var wikipedia_service_1 = require('./wikipedia.service');
var WikiSmartComponent = (function () {
    function WikiSmartComponent(wikipediaService) {
        var _this = this;
        this.wikipediaService = wikipediaService;
        this.searchTermStream = new Subject_1.Subject();
        /*
            Earlier, we passed each search term directly to the service and bound the template to the service results.
            Now we listen to the stream of terms, manipulating the stream before it reaches the WikipediaService.
        
            The WikipediaService returns a separate observable of string arrays (Observable<string[]>)
            for each request. We could have multiple requests in flight, all awaiting the server's reply,
            which means multiple observables-of-strings could arrive at any moment in any order.
        
            The switchMap (formerly known as flatMapLatest) returns a new observable that combines
            these WikipediaService observables, re-arranges them in their original request order,
            and delivers to subscribers only the most recent search results.
        
            The displayed list of search results stays in sync with the user's sequence of search terms.
            */
        this.items = this.searchTermStream
            .debounceTime(300) //wait for the user to stop typing for at least 300 milliseconds
            .distinctUntilChanged() //Only changed search values make it through to the service (distinctUntilChanged).
            .switchMap(function (term) { return _this.wikipediaService.search(term); });
    }
    /*
    Each search term is a string, so we create a new Subject of type string called searchTermStream.
    After every keystroke, the search method adds the search box value to that stream via the subject's next method.
    */
    WikiSmartComponent.prototype.search = function (term) { this.searchTermStream.next(term); };
    WikiSmartComponent = __decorate([
        core_1.Component({
            selector: 'my-wiki-smart',
            template: "\n    <h1>Smarter Wikipedia Demo</h1>\n    <p><i>Fetches when typing stops</i></p>\n\n    <input #term (keyup)=\"search(term.value)\"/>\n\n    <ul>\n      <li *ngFor=\"let item of items | async\">{{item}}</li>\n    </ul>\n  ",
            providers: [http_1.JSONP_PROVIDERS, wikipedia_service_1.WikipediaService]
        }), 
        __metadata('design:paramtypes', [wikipedia_service_1.WikipediaService])
    ], WikiSmartComponent);
    return WikiSmartComponent;
}());
exports.WikiSmartComponent = WikiSmartComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=wiki-smart.component.js.map