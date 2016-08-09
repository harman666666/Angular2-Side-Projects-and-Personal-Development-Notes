import { Component }        from '@angular/core';
import { JSONP_PROVIDERS }  from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { WikipediaService } from './wikipedia.service';
/*
What is JSONP

It's actually not too complicated...

Say you're on domain example.com, and you want to make a request to domain example.net.
To do so, you need to cross domain boundaries, a no-no in most of browserland.

The one item that bypasses this limitation is <script> tags.
When you use a script tag, the domain limitation is ignored, but under normal circumstances,
you can't really do anything with the results, the script just gets evaluated.

Enter JSONP. When you make your request to a server that is JSONP enabled,
you pass a special parameter that tells the server a little bit about your page.
That way, the server is able to nicely wrap up its response in a way that your page can handle.

For example, say the server expects a parameter called "callback" to enable its JSONP capabilities.
Then your request would look like:

http://www.example.net/sample.aspx?callback=mycallback
Without JSONP, this might return some basic JavaScript object, like so:

{ foo: 'bar' }
However, with JSONP, when the server receives the "callback" parameter,
it wraps up the result a little differently, returning something like this:

mycallback({ foo: 'bar' });
As you can see, it will now invoke the method you specified.
So, in your page, you define the callback function:

mycallback = function(data){
  alert(data.foo);
};
And now, when the script is loaded, it'll be evaluated, and your function will be executed. Voila, cross-domain requests!

It's also worth noting the one major issue with JSONP: you lose a lot of control of the request.
For example, there is no "nice" way to get proper failure codes back.
As a result, you end up using timers to monitor the request, etc, which is always a bit suspect.
The proposition for JSONRequest is a great solution to allowing cross domain
scripting, maintaining security, and allowing proper control of the request.

These days (2015), CORS is the recommended approach vs. JSONRequest.
JSONP is still useful for older browser support, but given the security implications, unless you have no choice CORS is the better choice.

JSONP is really a simple trick to overcome the XMLHttpRequest same domain policy.
(As you know one cannot send AJAX (XMLHttpRequest) request to a different domain.)

So - instead of using XMLHttpRequest we have to use script HTML tags, the ones you usually use to load js files,
in order for js to get data from another domain. Sounds weird?

Thing is - turns out script tags can be used in a fashion similar to XMLHttpRequest! Check this out:

script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.someWebApiServer.com/some-data';
You will end up with a script segment that looks like this after it loads the data:

<script>
{['some string 1', 'some data', 'whatever data']}
</script>
However this is a bit inconvenient, because we have to fetch this array from script tag.
So JSONP creators decided that this will work better(and it is):

script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.someWebApiServer.com/some-data?callback=my_callback';
Notice the my_callback function over there? So - when JSONP server receives your
request and finds callback parameter - instead of returning plain js array it'll return this:

my_callback({['some string 1', 'some data', 'whatever data']});
See where the profit is: now we get automatic callback (my_callback) that'll be triggered once we get the data.
That's all there is to know about JSONP: it's a callback and script tags.
*/
@Component({
  selector: 'my-wiki',
  template: `
    <h1>Wikipedia Demo</h1>
    <p><i>Fetches after each keystroke</i></p>

    <input #term (keyup)="search(term.value)"/>

    <ul>
      <li *ngFor="let item of items | async">{{item}}</li>
    </ul>
  `,
  providers: [JSONP_PROVIDERS, WikipediaService]
  //We register that collection at the component level to make Jsonp injectable in the WikipediaService.
  /*
  At the moment we call the server after every key stroke.
 1. The app should only make requests when the user stops typing .

  2. Search when the search term changes
  Suppose the user enters the word angular in the search box and pauses for a while.
  The application issues a search request for Angular.
  Then the user backspaces over the last three letters, lar,
  and immediately re-types lar before pausing once more.
  The search term is still "angular". The app shouldn't make another request.

  3. When there are multiple requests in-flight, the app should present the responses in the original request order. Not which one arrives first
  

  */
})
export class WikiComponent {
  items: Observable<string[]>;

  constructor (private wikipediaService: WikipediaService) {}

  search (term: string) {
    this.items = this.wikipediaService.search(term);
  }
    /*
    The search(term) method delegates to our WikipediaService which returns an observable array of string results
    (Observable<string[]). Instead of subscribing to the observable inside the component as we did in the HeroListComponent,
    we forward the observable result to the template (via items) where the async pipe in the ngFor handles the subscription.

    */

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/