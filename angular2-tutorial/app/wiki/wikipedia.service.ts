import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) {}

  search (term: string) {

    let wikiUrl = 'http://en.wikipedia.org/w/api.php';

    let params = new URLSearchParams();
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
               .map(request => <string[]> request.json()[1]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/