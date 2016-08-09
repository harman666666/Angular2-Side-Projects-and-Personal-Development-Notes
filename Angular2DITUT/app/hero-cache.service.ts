import { Injectable }  from '@angular/core';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Injectable()
export class HeroCacheService {
  hero: Hero;
  constructor(private heroService: HeroService) {}

  fetchCachedHero(id: number) {
    if (!this.hero) {
      this.hero = this.heroService.getHeroById(id);
    }
    return this.hero;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/