import { Component, OnInit } from '@angular/core';

import { Hero }              from './hero';
import { HeroService }       from './hero.service';

/////// HeroesBaseComponent /////
@Component({
  selector: 'unsorted-heroes',
  template: `<div *ngFor="let hero of heroes">{{hero.name}}</div>`,
  providers: [HeroService]
})
export class HeroesBaseComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  heroes: Array<Hero>;

  ngOnInit() {
    this.heroes = this.heroService.getAllHeroes();
    this.afterGetHeroes();
  }

  // Post-process heroes in derived class override.
  protected afterGetHeroes() {}

}

/////// SortedHeroesComponent /////
@Component({
  selector: 'sorted-heroes',
  template: `<div *ngFor="let hero of heroes">{{hero.name}}</div>`,
  providers: [HeroService]
})
export class SortedHeroesComponent extends HeroesBaseComponent {
    /*
    Users want to see the heroes in alphabetical order.
    Rather than modify the original component, we sub-class it and create a SortedHeroesComponent
    that sorts the heroes before presenting them. The SortedHeroesComponent
    lets the base class fetch the heroes. (we said it was contrived).

    Unfortunately, Angular cannot inject the HeroService directly into the base class.
    We must provide the HeroService again for this component,
    then pass it down to the base class inside the constructor.

    Now take note of the afterGetHeroes method.
    Our first instinct was to create an ngOnInit method in SortedHeroesComponent
    and do the sorting there. But Angular calls the derived class's ngOnInit before calling the base class's
    ngOnInit so we'd be sorting the heroes array before they arrived. That produces a nasty error.

    Overriding the base class's afterGetHeroes method solves the problem
    */

    constructor(heroService: HeroService) {
    super(heroService);
    }
    

  protected afterGetHeroes() {
    this.heroes = this.heroes.sort((h1, h2) => {
      return h1.name < h2.name ? -1 :
            (h1.name > h2.name ? 1 : 0);
    });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/