import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';

@Component({
    selector: 'my-dashboard',
    /*
    We specify the path all the way back to the application root — app/ in this case —
    because Angular doesn't support relative paths by default. We can switch to component-relative paths if we prefer.
    */
    templateUrl: 'app/dashboard.component.html',
    styles: [`
[class*='col-'] {
  float: left;
}
*, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
h3 {
  text-align: center; margin-bottom: 0;
}
[class*='col-'] {
  padding-right: 20px;
  padding-bottom: 20px;
}
[class*='col-']:last-of-type {
  padding-right: 0;
}
.grid {
  margin: 0;
}
.col-1-4 {
  width: 25%;
}
.module {
    padding: 20px;
    text-align: center;
    color: #eee;
    max-height: 120px;
    min-width: 120px;
    background-color: #607D8B;
    border-radius: 2px;
}
h4 {
  position: relative;
}
.module:hover {
  background-color: #EEE;
  cursor: pointer;
  color: #607d8b;
}
.grid-pad {
  padding: 10px 0;
}
.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}
@media (max-width: 600px) {
    .module {
      font-size: 10px;
      max-height: 75px; }
}
@media (max-width: 1024px) {
    .grid {
      margin: 0;
    }
    .module {
      min-width: 60px;
    }
}
`]
})


export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    constructor(private heroService: HeroService, private router: Router) { }
    ngOnInit() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
    gotoDetail(hero: Hero) {
        /*
        The gotoDetail method navigates in two steps:

        set a route link parameters array
        pass the array to the router's navigate method.

        This array has two elements, the name of the destination route and a route parameter object with an id field set to the value of the selected hero's id.
        The two array items align with the name and :id token in the parameterized HeroDetail route configuration we added to AppComponent earlier in the chapter.
        {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
        }

        */
        let link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);

    }
}