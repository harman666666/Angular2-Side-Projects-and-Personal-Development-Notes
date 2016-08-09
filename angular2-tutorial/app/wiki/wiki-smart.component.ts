import { Component }        from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { Subject }          from 'rxjs/Subject';

import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'my-wiki-smart',
  template: `
    <h1>Smarter Wikipedia Demo</h1>
    <p><i>Fetches when typing stops</i></p>

    <input #term (keyup)="search(term.value)"/>

    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
  `,
  providers: [JSONP_PROVIDERS, WikipediaService]
})
export class WikiSmartComponent {

  constructor (private wikipediaService: WikipediaService) { }

  private searchTermStream = new Subject<string>();
    /*
    Each search term is a string, so we create a new Subject of type string called searchTermStream.
    After every keystroke, the search method adds the search box value to that stream via the subject's next method.
    */


  search(term: string) { this.searchTermStream.next(term); }
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
  items: Observable<string[]> = this.searchTermStream
      .debounceTime(300) //wait for the user to stop typing for at least 300 milliseconds
      .distinctUntilChanged() //Only changed search values make it through to the service (distinctUntilChanged).
    .switchMap((term: string) => this.wikipediaService.search(term));
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/