"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var HeroDetailComponent = (function () {
    function HeroDetailComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
    }
    HeroDetailComponent.prototype.ngOnInit = function () {
        /*
        we use the ActivatedRoute service to retrieve the parameters for our route. Since our parameters are provided as an Observable, we subscribe to them for the id parameter by name and tell the HeroService to fetch the hero with that id. We'll keep a reference to this Subscription so we can tidy things up later.
      
          
        In this example, we subscribe to the route params Observable. That implies that the route params can change during the lifetime of this component.
        They might. By default, the router reuses a component instance when it re-navigates to the same component type without visiting a different component first.
        The parameters can change between each re-use.
        Suppose a parent component navigation bar had "forward" and "back" buttons that scrolled through the list of heroes.
        Each click navigated imperatively to the HeroDetailComponent with the next or previous id.
        We don't want the router to remove the current HeroDetailComponent instance from the DOM only to re-create it for the next id.
        That could be visibly jarring. Better to simply re-use the same component instance and update the parameter.
        But ngOnInit is only called once per instantiation. We need a way to detect when the route parameters change from within the same instance.
        The observable params property handles that beautifully.
          */
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            _this.service.getHero(id).then(function (hero) { return _this.hero = hero; });
        });
    };
    //Suppose we know for certain that HeroDetailComponent will never, never, ever be re-used. We'll always re-create the component each time we navigate to it.
    //The router offers a Snapshot alternative that gives us the initial value of the route parameters. We don't need to subscribe. We don't have 
    //to unsubscribe in ngDestroy. It's much simpler to write and read:
    /*
    The no-observables alternative
    ngOnInit() {
      // (+) converts string 'id' to a number
      let id = +this.route.snapshot.params['id'];
      this.service.getHero(id).then(hero => this.hero = hero);
      }
    */
    HeroDetailComponent.prototype.ngOnDestroy = function () {
        /*
      Eventually, we'll navigate somewhere else. The router will remove this component from the DOM and destroy it. We need to clean up after ourselves before that happens. Specifically, we must unsubscribe before Angular destroys the component. Failure to do so could create a memory leak.
        */
        this.sub.unsubscribe();
    };
    HeroDetailComponent.prototype.gotoHeroes = function () {
        /*
        The HeroDetailComponent has a "Back" button wired to its gotoHeroes method that navigates imperatively back to the HeroListComponent.
        The router navigate method takes the same one-item link parameters array that we bound to the application shell's Heroes [routerLink] directive. It holds the path to the HeroListComponent:
       
        When navigating to the HeroDetailComponent we specified the id of the hero-to-edit in the route parameter and made it the second item of the link parameters array.
      ['/hero', hero.id] // { 15 }
      The router embedded the id value in the navigation URL because we had defined it as a route parameter with an :id placeholder token in the route path:
      { path: 'hero/:id', component: HeroDetailComponent }
      When the user clicks the back button, the HeroDetailComponent constructs another link parameters array which it uses to navigate back to the HeroListComponent.
      gotoHeroes() { this.router.navigate(['/heroes']); }
        */
        var heroId = this.hero ? this.hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        this.router.navigate(['/heroes'], { queryParams: { id: heroId, foo: 'foo' } });
    };
    HeroDetailComponent = __decorate([
        core_1.Component({
            template: "\n  <h2>HEROES</h2>\n  <div *ngIf=\"hero\">\n    <h3>\"{{hero.name}}\"</h3>\n    <div>\n      <label>Id: </label>{{hero.id}}</div>\n    <div>\n      <label>Name: </label>\n      <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n    </div>\n    <p>\n      <button (click)=\"gotoHeroes()\">Back</button>\n    </p>\n  </div>\n  ",
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, hero_service_1.HeroService])
    ], HeroDetailComponent);
    return HeroDetailComponent;
    var _a, _b;
}());
exports.HeroDetailComponent = HeroDetailComponent;
/*
Now we have a reason. We'd like to send the id of the current hero with the navigation request so that the HeroListComponent can highlight that hero in its list.
We do that with a NavigationExtras object with queryParams. We also defined a junk parameter (foo) that the HeroListComponent should ignore.

URL:
localhost:3000/heroes?id=15&foo=foo
The id value appears in the query string (?id=15&foo=foo), not in the URL path. The path for the "Heroes" route doesn't have an :id token.


When navigating from the HeroListComponent to the HeroDetailComponent we subscribed the route params Observable and made it available to the
HeroDetailComponent in the ActivatedRoute service. We injected that service in the constructor of the HeroDetailComponent.

This time we'll be navigating in the opposite direction, from the HeroDetailComponent to the HeroListComponent.
This time we'll inject the Router service in the constructor of the HeroListComponent.

First we extend the router import statement to include the ActivatedRoute service symbol;
*/
//# sourceMappingURL=hero-detail.component.js.map