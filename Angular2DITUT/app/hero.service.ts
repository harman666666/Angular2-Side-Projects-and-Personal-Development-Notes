import { Injectable } from '@angular/core';
import { Hero }       from './hero';

@Injectable()
export class HeroService {

  // TODO move to database
  private heroes: Array<Hero> = [
    new Hero(1, 'RubberMan', 'Hero of many talents', '123-456-7899'),
    new Hero(2, 'Magma', 'Hero of all trades', '555-555-5555'),
    new Hero(3, 'Mr. Nice', 'The name says it all', '111-222-3333')
 ];

  getHeroById(id: number): Hero {
    return this.heroes.filter(hero => hero.id === id)[0];
  }

  getAllHeroes(): Array<Hero> {
    return this.heroes;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/