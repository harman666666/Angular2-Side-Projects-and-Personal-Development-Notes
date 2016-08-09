// Promise Version
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service.promise';

@Component({
  selector: 'hero-list-promise',
  templateUrl: 'app/toh/hero-list.component.html',
  providers: [ HeroService ]
})
export class HeroListPromiseComponent implements OnInit {
  errorMessage: string;
  heroes: Hero[];
  mode = 'Promise';

  constructor (private heroService: HeroService) {}

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.heroService.getHeroes()
                     .then(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }

  addHero (name: string) {
    if (!name) { return; }
    this.heroService.addHero(name)
                     .then(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/