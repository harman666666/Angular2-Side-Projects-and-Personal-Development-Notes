/*
The template won't change. We'll display a hero the same way. The big changes are driven by how we get the hero.

We will no longer receive the hero in a parent component property binding. The new HeroDetailComponent should take the id parameter from the router's RouteParams service and use the HeroService to fetch the hero with that id.

We need an import statement to reference the RouteParams.
*/
import { RouteParams } from '@angular/router-deprecated';


//import { Component, Input } from '@angular/core';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
    selector: 'my-hero-detail',
    template: `
   <div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div>
    <label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name" />
   </div>
  <button (click)="goBack()">Back</button>
  <button (click)="save()">Save</button>
</div>
  `,
    styles: [`
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer; cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc; 
  cursor: auto;
}
`]
})
export class HeroDetailComponent implements OnInit {
    /*
    Notice that the hero property is the target of a property binding — it's in square brackets to the left of the (=).

Angular insists that we declare a target property to be an input property. If we don't, Angular rejects the binding and throws an error.

We explain input properties in more detail here where we also explain why target properties require this special treatment and source properties do not.

There are a couple of ways we can declare that hero is an input. We'll do it the way we prefer, by annotating the hero property with the @Input decorator that we imported earlier.
    */
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; // true if navigated here

    //We import the HeroServiceso we can fetch a hero.
    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams) {
    }

    //Inside the ngOnInit lifecycle hook, extract the id parameter value from the RouteParams service and use the HeroService to fetch the hero with that id.
    ngOnInit() {
        //Notice how we extract the id by calling the RouteParams.get method.
        //The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator.
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
        /*
        In order to differentiate between add and edit we are adding a check to see if an id is passed in the url.
        If the id is absent we bind HeroDetailComponent to an empty Hero object. In either case, any edits made through the UI will be bound back to the same hero property.
        */
    }

    /*
    The same save method is used for both add and edit since HeroService will know when to call post vs put based on the state of the Hero object.
    */
    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    //After we save a hero, we redirect the browser back to the previous page using the goBack() method.
    /*
    Here we call emit to notify that we just added or modified a hero.
    HeroesComponent is listening for this notification and will automatically refresh the list of heroes to include our recent updates.
    */
    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) { window.history.back(); }
    }


}