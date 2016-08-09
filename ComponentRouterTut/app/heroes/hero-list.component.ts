// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Hero, HeroService }   from './hero.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[];

  private selectedId: number;
  private sub: any;

//DI the router
  constructor(
    private service: HeroService,
    private router: Router) {}


/*
Get query parameters from hero-details-component
we use the routerState to access the globally available query parameters Observable so we can subscribe and extract the id parameter as the selectedId:
All route/query parameters are strings. The (+) in front of the params['id'] expression is a JavaScript trick to convert the string to an integer.
We add an isSelected method that returns true when a hero's id matches the selected id.
Finally, we update our template with a Class Binding to that isSelected method. The binding adds the selected CSS class when the method returns 
true and removes it when false

The foo query string parameter is harmless and continues to be ignored.

Child Routers and Query Parameters
We can define query parameters for child routers too. => look at child routes
*/
  ngOnInit() {
    this.sub = this.router
      .routerState
      .queryParams
      .subscribe(params => {
        this.selectedId = +params['id'];
        this.service.getHeroes()
          .then(heroes => this.heroes = heroes);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isSelected(hero: Hero) { return hero.id === this.selectedId; }

  onSelect(hero: Hero) {
    /*
It calls the router's navigate method with a Link Parameters Array. This array is similar to the link parameters array we met earlier in 
an anchor tag while binding to the RouterLink directive. This time we see it in code rather than in HTML.

The router composes the appropriate two-part destination URL from this array:
localhost:3000/hero/15
    */
    this.router.navigate(['/hero', hero.id]);
  }

}

