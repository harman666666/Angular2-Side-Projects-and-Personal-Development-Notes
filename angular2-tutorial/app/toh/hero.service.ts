
//HeroService
// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HeroService {
    //Notice that the Angular Http client service is injected into the HeroService constructor.
    constructor(private http: Http) { }

    private heroesUrl = 'app/heroes';  // URL to web API
    /*
    The http.get does not send the request just yet! This observable is cold which means the request won't go out until something subscribes
    to the observable.
    That something is the HeroListComponent.
    */
    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl) //We pass the resource URL to get and it calls the server which should return heroes.
            .map(this.extractData)
            .catch(this.handleError);
    }

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
    addHero(name: string): Observable<Hero> {
        let body = JSON.stringify({ name });
        /*
        Despite the content type being specified as JSON,
        the POST body must actually be a string.
        Hence, we explicitly encode the JSON hero content before passing it in as the body argument.
        We may be able to skip the JSON.stringify step in the near future.
        */

        let headers = new Headers({ 'Content-Type': 'application/json' });
        //The Content-Type header allows us to inform the server that the body will represent JSON.

        let options = new RequestOptions({ headers: headers });

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
    }

    private extractData(res: Response) {
        let body = res.json();//The response data are in JSON string form. 
        //We must parse that string into JavaScript objects which we do by calling response.json().
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        /*
        We use the Observable catch operator on the service level.
        It takes an error handling function with an error object as the argument.
        Our service handler, handleError, logs the response to the console,
        transforms the error into a user-friendly message, and returns the message in a new,
        failed observable via Observable.throw.
        */
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

/*
  private heroesUrl = 'app/heroes.json'; // URL to JSON file
*/


