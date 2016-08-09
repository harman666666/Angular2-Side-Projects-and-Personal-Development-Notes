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
var hero_service_1 = require('./hero.service');
var router_deprecated_1 = require('@angular/router-deprecated');
var DashboardComponent = (function () {
    function DashboardComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
        this.heroes = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
    };
    DashboardComponent.prototype.gotoDetail = function (hero) {
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
        var link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'my-dashboard',
            /*
            We specify the path all the way back to the application root � app/ in this case �
            because Angular doesn't support relative paths by default. We can switch to component-relative paths if we prefer.
            */
            templateUrl: 'app/dashboard.component.html',
            styles: ["\n[class*='col-'] {\n  float: left;\n}\n*, *:after, *:before {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\nh3 {\n  text-align: center; margin-bottom: 0;\n}\n[class*='col-'] {\n  padding-right: 20px;\n  padding-bottom: 20px;\n}\n[class*='col-']:last-of-type {\n  padding-right: 0;\n}\n.grid {\n  margin: 0;\n}\n.col-1-4 {\n  width: 25%;\n}\n.module {\n    padding: 20px;\n    text-align: center;\n    color: #eee;\n    max-height: 120px;\n    min-width: 120px;\n    background-color: #607D8B;\n    border-radius: 2px;\n}\nh4 {\n  position: relative;\n}\n.module:hover {\n  background-color: #EEE;\n  cursor: pointer;\n  color: #607d8b;\n}\n.grid-pad {\n  padding: 10px 0;\n}\n.grid-pad > [class*='col-']:last-of-type {\n  padding-right: 20px;\n}\n@media (max-width: 600px) {\n    .module {\n      font-size: 10px;\n      max-height: 75px; }\n}\n@media (max-width: 1024px) {\n    .grid {\n      margin: 0;\n    }\n    .module {\n      min-width: 60px;\n    }\n}\n"]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_deprecated_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map