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
// TODO SOMEDAY: Feature Componetized like CrisisCenter
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var hero_service_1 = require('./hero.service');
var HeroListComponent = (function () {
    //DI the router
    function HeroListComponent(service, router) {
        this.service = service;
        this.router = router;
    }
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
    HeroListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.router
            .routerState
            .queryParams
            .subscribe(function (params) {
            _this.selectedId = +params['id'];
            _this.service.getHeroes()
                .then(function (heroes) { return _this.heroes = heroes; });
        });
    };
    HeroListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    HeroListComponent.prototype.isSelected = function (hero) { return hero.id === this.selectedId; };
    HeroListComponent.prototype.onSelect = function (hero) {
        /*
    It calls the router's navigate method with a Link Parameters Array. This array is similar to the link parameters array we met earlier in
    an anchor tag while binding to the RouterLink directive. This time we see it in code rather than in HTML.
    
    The router composes the appropriate two-part destination URL from this array:
    localhost:3000/hero/15
        */
        this.router.navigate(['/hero', hero.id]);
    };
    HeroListComponent = __decorate([
        core_1.Component({
            template: "\n    <h2>HEROES</h2>\n    <ul class=\"items\">\n      <li *ngFor=\"let hero of heroes\"\n        [class.selected]=\"isSelected(hero)\"\n        (click)=\"onSelect(hero)\">\n        <span class=\"badge\">{{hero.id}}</span> {{hero.name}}\n      </li>\n    </ul>\n  "
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], HeroListComponent);
    return HeroListComponent;
    var _a;
}());
exports.HeroListComponent = HeroListComponent;
//# sourceMappingURL=hero-list.component.js.map