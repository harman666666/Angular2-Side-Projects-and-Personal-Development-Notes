import { Component, Input, OnInit } from '@angular/core';

import { HeroCacheService }         from './hero-cache.service';

@Component({
  selector: 'hero-bio',
  template: `
    <h4>{{hero.name}}</h4>
    <ng-content></ng-content>
    <textarea cols="25" [(ngModel)]="hero.description"></textarea>`,
  providers: [HeroCacheService]
})
/*
    Each HeroBioComponent gets its own HeroCacheService instance by listing the HeroCacheService in its metadata providers array.
    rather than putting just one in the parent element
    the three HeroBioComponent instances have their own cached hero data.
    Sandboxing

*/
export class HeroBioComponent implements OnInit  {
  @Input() heroId: number; //HeroBios Component able to put number in this property using [heroId] = "2" syntax even doe component doesnt define inputs

  constructor(private heroCache: HeroCacheService) { }

  ngOnInit() { this.heroCache.fetchCachedHero(this.heroId); }

  get hero() { return this.heroCache.hero; }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/