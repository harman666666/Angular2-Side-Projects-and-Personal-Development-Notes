/**
 * YouTubeSearchComponent is a tiny app that will autocomplete search YouTube.
 */

import {
  Component,
  Injectable,
  bind,
  OnInit,
  ElementRef,
  EventEmitter,
  Inject
} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

/*
  This API key may or may not work for you. Your best bet is to issue your own
  API key by following these instructions:
  https://developers.google.com/youtube/registering_an_application#Create_API_Keys

  Here I've used a **server key** and make sure you enable YouTube.

  Note that if you do use this API key, it will only work if the URL in
  your browser is "localhost"
*/

/*
We’re going to build a way to search YouTube as you type. When the search returns
we’ll show a list of video thumbnail results, along with a description and link to each video.
*/

export var YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';
let loadingGif: string = ((<any>window).__karma__) ? '' : require('images/loading.gif');

class SearchResult {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;

     /*
    This pattern of taking an obj?: any lets us simulate keyword arguments. The idea is that we can
    create a new SearchResult and just pass in an object containing the keys we want to specify.
    */

  constructor(obj?: any) {
    this.id              = obj && obj.id             || null;
    this.title           = obj && obj.title          || null;
    this.description     = obj && obj.description    || null;
    this.thumbnailUrl    = obj && obj.thumbnailUrl   || null;
    this.videoUrl        = obj && obj.videoUrl       ||
                             `https://www.youtube.com/watch?v=${this.id}`;
  }
}

/*
In order to use this API you need to have an API key. I’ve included an API key in the sample
code which you can use. However, by the time you read this, you may find it’s over the
rate limits. If that happens, you’ll need to issue your own key.
To issue your own key see this documentation⁶⁹. For simplicities sake, I’ve registered a
server key, but you should probably use a browser key if you’re going to put your javascript
code online.

We’re going to setup two constants for our YouTubeService mapping to our API key and the API
URL:
1 let YOUTUBE_API_KEY: string = "XXX_YOUR_KEY_HERE_XXX";
2 let YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";

To help with this environment configuration, one of the things we can do is make these constants
injectable.Because if we
make them injectable we can
1. have code that injects the right constants for a given environment at deploy time and
2. replace the injected value easily at test-time

In order to make these values injectable, we use the bind(...).toValue(...) syntax like this:

83 export var youTubeServiceInjectables: Array<any> = [
84 bind(YouTubeService).toClass(YouTubeService),
85 bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
86 bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
87 ];

Here we’re specifying that we want to bind YOUTUBE_API_KEY “injectably” to the value of YOUTUBE_API_KEY

If you recall, to make something available to be injected throughout our application, we need to
make it a dependency at bootstrap. Since we’re exporting youTubeServiceInjectables here we can
import it in our app.ts

1 // http/app.ts
2 import { youTubeServiceInjectables } from "components/YouTubeSearchComponent";
3
4 // ....
5 // further down
6 bootstrap(HttpApp, [ HTTP_PROVIDERS, youTubeServiceInjectables ]);
*/

@Injectable()
export class YouTubeService {
   /*
    In the constructor we inject three things:
    1. Http
    2. YOUTUBE_API_KEY
    3. YOUTUBE_API_URL
Notice that we make instance variables from all three arguments, meaning we can access them as
this.http, this.apiKey, and this.apiUrl respectively.
Notice that we explicitly inject using the @Inject(YOUTUBE_API_KEY) notation.
    */

  constructor(public http: Http,
              @Inject(YOUTUBE_API_KEY) private apiKey: string,
              @Inject(YOUTUBE_API_URL) private apiUrl: string) {
  }

  search(query: string): Observable<SearchResult[]> {
    let params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    let queryUrl: string = `${this.apiUrl}?${params}`;

     //Now that we have a queryUrl we can make our request:

    return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).items.map(item => {
          // console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
        });

                  /*
    Here we take the return value of http.get and use map to get the Response from the request. From
that response we extract the body as an object using .json() and then we iterate over each item
and convert it to a SearchResult.

        Notice that we’re calling (<any>response.json()).items. What’s going on here? We’re
telling TypeScript that we’re not interested in doing strict type checking.
When working with a JSON API, we don’t generally have typing definitions for the API
responses, and so TypeScript won’t know that the Object returned even has an items key,
so the compiler will complain.
We could call response.json()["items"] and then cast that to an Array etc., but in this
case (and in creating the SearchResult, it’s just cleaner to use an any type, at the expense
of strict type checking
    */


  }
}

export var youTubeServiceInjectables: Array<any> = [
  bind(YouTubeService).toClass(YouTubeService),
  bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
  bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
];


//Writing the Search Box: it is the mediator between our UI and the YouTubeService
/*
The SearchBox will:
1. Watch for keyup on an input and submit a search to the YouTubeService
2. Emit a loading event when we’re loading (or not)
3. Emit a results event when we have new results

*/
@Component({
       /*
    The outputs key specifies events that will be emitted from this component. That is, we can use the
(ouput)="callback()" syntax in our view to listen to events on this component. For example, here’s
how we will use the search-box tag in our view later on:

1 <search-box
2 (results)="updateResults($event)"
3 (loading)="loading = $event"
4 ></search-box>

In this example, when the SearchBox component emits a loading event, we will set the variable
loading in the parent context. Likewise, when the SearchBox emits a results event, we will call
the updateResults() function, with the value, in the parent’s context.
In the @Component configuration we’re simply specifying the names of the events with the strings
"loading" and "results". In this example, each event will have a corresponding EventEmitter as
an instance variable of the controller class.
    */
    outputs: ['loading', 'results'],
  selector: 'search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
class SearchBox implements OnInit {
     /*
    We say that this class implements OnInit because we want to use the ngOnInit lifecycle callback. If
a class implements OnInit then the ngOnInit function will be called after the first change detection
check.
ngOnInit is a good place to do initialization (vs. the constructor) because inputs set on a component
are not available in the constructor.
    */
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(public youtube: YouTubeService,
      private el: ElementRef) {
       /*
        In our constructor we inject:
1. Our YouTubeService and
2. The element el that this component is attached to. el is an object of type ElementRef, which
is an Angular wrapper around a native element.
We set both injections as instance variables
        */
  }
    /*
        For searchbox we want to:
1. Filter out any empty or short queries
2. “debounce” the input, that is, don’t search on every character but only after the user has
stopped typing after a short amount of time
3. discard any old searches, if the user has made a new search

We could manually bind to keyup and call a function on each keyup event and then implement
filtering and debouncing from there. However, there is a better way: turn the keyup events into an
observable stream.
RxJS provides a way to listen to events on an element using Rx.Observable.fromEvent. We can use
it like so:
    
    */

  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
      Observable.fromEvent(this.el.nativeElement, 'keyup')
   /*
    • the first argument is this.el.nativeElement (the native DOM element this component is attached to)
    • the second argument is the string 'keyup', which is the name of the event we want to turn into a stream
    */
          .map((e: any) => e.target.value) // extract the value of the input
           /* extract the value of the input
    This means our stream is now a stream of strings
    map over each keyup event, then find the event target (e.target, that is, our input
    element) and extract the value of that element.
     */
          .filter((text: string) => text.length > 1) // filter out if empty
           /*
    This filter means the stream will not emit any search strings for which the length is less than one.
    */
          .debounceTime(250)                         // only once every 250ms
           /*
debounceTime means we will throttle requests that come in faster than 250ms. 
    */
          .do(() => this.loading.next(true))         // enable loading
           /*
    Using do on a stream is way to perform a function mid-stream for each event, but it does not change
anything in the stream. The idea here is that we’ve got our search, it has enough characters, and
we’ve debounced, so now we’re about to search, so we turn on loading.
this.loading is an EventEmitter. We “turn on” loading by emitting true as the next event. We emit
something on an EventEmitter by calling next. Writing this.loading.next(true) means, emit a
true event on the loading EventEmitter. When we listen to the loading event on this component,
the $event value will now be true
    */
      .map((query: string) => this.youtube.search(query))
      .switch()
       /*
    By using switch we’re,
essentially, saying “ignore all search events but the most recent” 1⁷¹. That is, if a new search comes
in, we want to use the most recent and discard the rest.
    Because we are calling out to our YouTubeService our stream is now a stream of SearchResult[].
We can subscribe to this stream and perform actions accordingly.
    We can subscribe to this stream and perform actions accordingly.
subscribe takes three arguments: onSuccess, onError, onCompletion.
    */
      .subscribe(
        (results: SearchResult[]) => { // on sucesss
          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.next(false);
        },
        () => { // on completion
          this.loading.next(false);
        }
      );

  }
}

//Search Result Component - Renders a single Search Result.
@Component({
  inputs: ['result'],
  selector: 'search-result',
  template: `
   <div class="col-sm-6 col-md-3">
      <div class="thumbnail">
        <img src="{{result.thumbnailUrl}}">
        <div class="caption">
          <h3>{{result.title}}</h3>
          <p>{{result.description}}</p>
          <p><a href="{{result.videoUrl}}"
                class="btn btn-default" role="button">Watch</a></p>
        </div>
      </div>
    </div>
  `
})
export class SearchResultComponent {
  result: SearchResult;
}

//Youtube Search Component
@Component({
  selector: 'youtube-search',
  directives: [SearchBox, SearchResultComponent],
  template: `
  <div class='container'>
      <div class="page-header">
        <h1>YouTube Search
          <img
            style="float: right;"
            *ngIf="loading"
            src='${loadingGif}' />
        </h1>
      </div>

      <div class="row">
        <div class="input-group input-group-lg col-md-12">
          <search-box
             (loading)="loading = $event"
             (results)="updateResults($event)"
              ></search-box>
        </div>
      </div>

      <div class="row">
        <search-result
          *ngFor="let result of results"
          [result]="result">
        </search-result>
      </div>
  </div>
  `
})
export class YouTubeSearchComponent {
  results: SearchResult[];

  updateResults(results: SearchResult[]): void {
    this.results = results;
     console.log("results:", this.results); // uncomment to take a look
  }
     /*
    Notice that our img has a src of ${loadingGif} - that loadingGif variable came from a
    require statement earlier in the program. Here we’re taking advantage of webpack’s image
    loading feature.
    */
}
