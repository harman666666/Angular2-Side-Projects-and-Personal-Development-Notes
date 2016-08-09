import { Hero } from './hero';

export class HeroData {
  createDb() {
    let heroes = [
      new Hero(1, 'Windstorm'),
      new Hero(2, 'Bombasto'),
      new Hero(3, 'Magneta'),
      new Hero(4, 'Tornado')
    ];
    return {heroes};
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/