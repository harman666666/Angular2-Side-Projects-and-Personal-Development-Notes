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
/*
The template won't change. We'll display a hero the same way. The big changes are driven by how we get the hero.

We will no longer receive the hero in a parent component property binding. The new HeroDetailComponent should take the id parameter from the router's RouteParams service and use the HeroService to fetch the hero with that id.

We need an import statement to reference the RouteParams.
*/
var router_deprecated_1 = require('@angular/router-deprecated');
//import { Component, Input } from '@angular/core';
var core_1 = require('@angular/core');
var hero_1 = require('./hero');
var hero_service_1 = require('./hero.service');
var HeroDetailComponent = (function () {
    //We import the HeroServiceso we can fetch a hero.
    function HeroDetailComponent(heroService, routeParams) {
        this.heroService = heroService;
        this.routeParams = routeParams;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    //Inside the ngOnInit lifecycle hook, extract the id parameter value from the RouteParams service and use the HeroService to fetch the hero with that id.
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Notice how we extract the id by calling the RouteParams.get method.
        //The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator.
        if (this.routeParams.get('id') !== null) {
            var id = +this.routeParams.get('id');
            this.navigated = true;
            this.heroService.getHero(id)
                .then(function (hero) { return _this.hero = hero; });
        }
        else {
            this.navigated = false;
            this.hero = new hero_1.Hero();
        }
        /*
        In order to differentiate between add and edit we are adding a check to see if an id is passed in the url.
        If the id is absent we bind HeroDetailComponent to an empty Hero object. In either case, any edits made through the UI will be bound back to the same hero property.
        */
    };
    /*
    The same save method is used for both add and edit since HeroService will know when to call post vs put based on the state of the Hero object.
    */
    HeroDetailComponent.prototype.save = function () {
        var _this = this;
        this.heroService
            .save(this.hero)
            .then(function (hero) {
            _this.hero = hero; // saved hero, w/ id if new
            _this.goBack(hero);
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    //After we save a hero, we redirect the browser back to the previous page using the goBack() method.
    /*
    Here we call emit to notify that we just added or modified a hero.
    HeroesComponent is listening for this notification and will automatically refresh the list of heroes to include our recent updates.
    */
    HeroDetailComponent.prototype.goBack = function (savedHero) {
        if (savedHero === void 0) { savedHero = null; }
        this.close.emit(savedHero);
        if (this.navigated) {
            window.history.back();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hero_1.Hero)
    ], HeroDetailComponent.prototype, "hero", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeroDetailComponent.prototype, "close", void 0);
    HeroDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-hero-detail',
            template: "\n   <div *ngIf=\"hero\">\n  <h2>{{hero.name}} details!</h2>\n  <div>\n    <label>id: </label>{{hero.id}}</div>\n  <div>\n    <label>name: </label>\n    <input [(ngModel)]=\"hero.name\" placeholder=\"name\" />\n   </div>\n  <button (click)=\"goBack()\">Back</button>\n  <button (click)=\"save()\">Save</button>\n</div>\n  ",
            styles: ["\nlabel {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc; \n  cursor: auto;\n}\n"]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_deprecated_1.RouteParams])
    ], HeroDetailComponent);
    return HeroDetailComponent;
}());
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map