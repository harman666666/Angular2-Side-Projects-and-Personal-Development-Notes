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
//HeroService
// Observable Version
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var HeroService = (function () {
    //Notice that the Angular Http client service is injected into the HeroService constructor.
    function HeroService(http) {
        this.http = http;
        this.heroesUrl = 'app/heroes'; // URL to web API
    }
    /*
    The http.get does not send the request just yet! This observable is cold which means the request won't go out until something subscribes
    to the observable.
    That something is the HeroListComponent.
    */
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl) //We pass the resource URL to get and it calls the server which should return heroes.
            .map(this.extractData)
            .catch(this.handleError);
    };
    /*
    We'll create an easy method for the HeroListComponent to call, an addHero() method that takes just the name of a new hero:
    
    addHero (name: string): Observable<Hero> {
    
    To implement it, we need to know some details about the server's api for creating heroes.
    
    Our data server follows typical REST guidelines
    It expects a POST request at the same endpoint where we GET heroes.
    It expects the new hero data to arrive in the body of the request,
    structured like a Hero entity but without the id property.
    The body of the request should look like this:
    
    { "name": "Windstorm" }
    The server will generate the id and return the entire JSON
    representation of the new hero including its generated id.
    The hero arrives tucked inside a response object with its own data property.
        */
    HeroService.prototype.addHero = function (name) {
        var body = JSON.stringify({ name: name });
        /*
        Despite the content type being specified as JSON,
        the POST body must actually be a string.
        Hence, we explicitly encode the JSON hero content before passing it in as the body argument.
        We may be able to skip the JSON.stringify step in the near future.
        */
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        //The Content-Type header allows us to inform the server that the body will represent JSON.
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.heroesUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
        /*
       Back in the HeroListComponent,
        we see that its addHero() method subscribes to the observable returned by the service's addHero() method.
       When the data, arrive it pushes the new hero object into its heroes array for presentation to the user.

addHero (name: string) {
if (!name) { return; }
this.heroService.addHero(name)
              .subscribe(
                hero  => this.heroes.push(hero),
                error =>  this.errorMessage = <any>error);
}
       */
    };
    HeroService.prototype.extractData = function (res) {
        var body = res.json(); //The response data are in JSON string form. 
        //We must parse that string into JavaScript objects which we do by calling response.json().
        return body.data || {};
    };
    HeroService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        /*
        We use the Observable catch operator on the service level.
        It takes an error handling function with an error object as the argument.
        Our service handler, handleError, logs the response to the console,
        transforms the error into a user-friendly message, and returns the message in a new,
        failed observable via Observable.throw.
        */
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
/*
  private heroesUrl = 'app/heroes.json'; // URL to JSON file
*/
//# sourceMappingURL=hero.service.js.map