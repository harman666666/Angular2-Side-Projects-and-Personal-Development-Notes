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
var WikipediaService = (function () {
    function WikipediaService(jsonp) {
        this.jsonp = jsonp;
    }
    WikipediaService.prototype.search = function (term) {
        var wikiUrl = 'http://en.wikipedia.org/w/api.php';
        var params = new http_1.URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        /*
        The Wikipedia 'opensearch' API expects four parameters (key/value pairs)
        to arrive in the request URL's query string. The keys are search, action,
        format, and callback. The value of the search key is the user-supplied search term to find in Wikipedia.
        The other three are the fixed values "opensearch", "json", and "JSONP_CALLBACK" respectively.
  
        If we're looking for articles with the word "Angular", we could construct the query string by hand and call jsonp like this:
  
  ///////////////////////////////////////////////////////////
  let queryString =
    `?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK`;
  
  return this.jsonp
             .get(wikiUrl + queryString)
             .map(request => <string[]> request.json()[1]);
  //////////////////////////////////////////////////////////////////////
  We might prefer to build the query string with the Angular URLSearchParams helper as shown here:
  ///////////////////////////////////////////////////////
      let params = new URLSearchParams();
  params.set('search', term); // the user's search value
      params.set('action', 'opensearch');
      params.set('format', 'json');
      params.set('callback', 'JSONP_CALLBACK');
  /////////////////////////////////////////////////////////
  This time we call jsonp with two arguments: the wikiUrl and an options object whose search property is the params object.
        */
        // TODO: Add error handling
        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(function (request) { return request.json()[1]; });
    };
    WikipediaService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Jsonp])
    ], WikipediaService);
    return WikipediaService;
}());
exports.WikipediaService = WikipediaService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=wikipedia.service.js.map