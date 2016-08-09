// Observable Version
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';

@Component({
    selector: 'hero-list',
    template:
    `
<h1>Tour of Heroes ({{mode}})</h1>
<h3>Heroes:</h3>
<ul>
  <li *ngFor="let hero of heroes">
    {{hero.name}}
  </li>
</ul>
New hero name:
<input #newHeroName />
<button (click)="addHero(newHeroName.value); newHeroName.value=''">
  Add Hero
</button>
<div class="error" *ngIf="errorMessage">{{errorMessage}}</div>

`,
    providers: [HeroService]
})
export class HeroListComponent implements OnInit {
    errorMessage: string;
    heroes: Hero[];
    mode = 'Observable';

    constructor(private heroService: HeroService) { }
    /*
    Angular injects a HeroService into the constructor and the component calls that service to fetch and save data.
    The component does not talk directly to the Angular Http client!
    The component doesn't know or care how we get the data. It delegates to the HeroService.
    */
    ngOnInit() { this.getHeroes(); }

    /*
    The service's getHeroes() and addHero() methods return an Observable of hero data that the Angular Http client fetched from the server.
Observables are a big topic, beyond the scope of this chapter. But we need to know a little about them to appreciate what is going on here.
We should think of an Observable as a stream of events published by some source. We listen for events in this stream by subscribing to the Observable.
    In these subscriptions we specify the actions to take when the web request produces a success event
    (with the hero data in the event payload) or a fail event (with the error in the payload).

The subscribe method returns a Subscription. A Subscription is not another Observable.
It's the end of the line for observables. We can't call map on it or call subscribe again.
The Subscription object has a different purpose, signified by its primary method, unsubscribe.
    */
    getHeroes() {
        this.heroService.getHeroes()
            .subscribe(
            heroes => this.heroes = heroes,
            error => this.errorMessage = <any>error);
        /*
        , we supply the subscribe function with a second function parameter to handle the error message.
        It sets an errorMessage variable which we've bound conditionally in the HeroListComponent template.
        */
    }

    addHero(name: string) {
        if (!name) { return; }
        this.heroService.addHero(name)
            .subscribe(
            hero => this.heroes.push(hero),
            error => this.errorMessage = <any>error);
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
