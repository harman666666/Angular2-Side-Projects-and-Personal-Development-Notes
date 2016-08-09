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
var hero_detail_component_1 = require('./hero-detail.component');
var hero_service_1 = require('./hero.service');
var router_deprecated_1 = require('@angular/router-deprecated');
/*
We could create a new instance of the HeroService with new like this:


heroService = new HeroService(); // don't do this
That's a bad idea for several reasons including

Our component has to know how to create a HeroService. If we ever change the HeroService constructor,
we'll have to find every place we create the service and fix it. Running around patching code is error prone and adds to the test burden.

We create a new service each time we use new.
What if the service should cache heroes and share that cache with others? We couldn't do that.

We're locking the AppComponent into a specific implementation of the HeroService.
It will be hard to switch implementations for different scenarios.
Can we operate offline? Will we need different mocked versions under test? Not easy.
*/
var HeroesComponent = (function () {
    function HeroesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
        this.addingHero = false;
        /*
        The constructor itself does nothing. The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
        We have to teach the injector how to make a HeroService by registering a HeroService provider.
        Do that by adding the following providers array property to the bottom of the component metadata in the @Component call.

        AppComponent should fetch and display heroes without a fuss.
        Where do we call the getHeroes method? In a constructor? We do not!
         Years of experience and bitter tears have taught us to keep complex logic out of the constructor,
        especially anything that might call a server as a data access method is sure to do.
        The constructor is for simple initializations like wiring constructor parameters to properties.
        It's not for heavy lifting. We should be able to create a component in a test and not worry
        that it might do real work � like calling a server! � before we tell it to do so.
        If not the constructor, something has to call getHeroes.
        Angular will call it if we implement the Angular ngOnInit Lifecycle Hook.
        Angular offers a number of interfaces for tapping into critical moments in the component lifecycle: at creation, after each change, and at its eventual destruction.
        Each interface has a single method. When the component implements that method, Angular calls it at the appropriate time.

         We have to change our implementation to act on the Promise when it resolves. When the Promise resolves successfully, then we will have heroes to display.
          */
    }
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
        this.addingHero = false;
    };
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes().then(function (heroes) { return _this.heroes = heroes; });
    };
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    };
    /*
    The HeroDetailComponent does most of the work. All we do is toggle an *ngIf flag that swaps it into the DOM when we add a hero and removes it from the DOM when the user is done.
    */
    HeroesComponent.prototype.addHero = function () {
        this.addingHero = true;
        this.selectedHero = null;
    };
    HeroesComponent.prototype.close = function (savedHero) {
        this.addingHero = false;
        if (savedHero) {
            this.getHeroes();
        }
    };
    HeroesComponent.prototype.delete = function (hero, event) {
        var _this = this;
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(function (res) {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        })
            .catch(function (error) { return _this.error = error; }); // TODO: Display error message
    };
    HeroesComponent = __decorate([
        core_1.Component({
            selector: 'my-heroes',
            /*
              <!-- each hero goes here
            The (*) prefix to ngFor indicates that the <li> element
            and its children constitute a master template.
            The ngFor directive iterates over the heroes array returned by the
            AppComponent.heroes property and stamps out instances of this template.
            The quoted text assigned to ngFor means �take each hero in the heroes array,
            store it in the local hero variable, and make it available to the corresponding template instance�.
            The let keyword before "hero" identifies hero as a template input variable.
            We can reference this variable within the template to access a hero�s properties.-->
            
            ngIf and ngFor are called �structural directives�
            because they can change the structure of portions of the DOM.
            In other words, they give structure to the way Angular displays content in the DOM.
            
            We�ll add a property binding on class for the selected class to the template.
            We'll set this to an expression that compares the current selectedHero to the hero.
            
            The key is the name of the CSS class (selected).
            The value is true if the two heroes match and false otherwise.
             We�re saying �apply the selected class if the heroes match, remove it if they don�t�.
            
            [class.selected]="hero === selectedHero"
            Notice in the template that the class.selected is surrounded in square brackets ([]).
            This is the syntax for a property binding, a binding in which data flows one way from the data source
            (the expression hero === selectedHero) to a property of class.
            
            Notice that the hero's name is displayed in CAPITAL LETTERS.
            That's the effect of the UpperCasePipe that we slipped into the interpolation binding.
            Look for it right after the pipe operator ( | ).
            Pipes are a good way to format strings, currency amounts, dates and other display data. Angular ships with several pipes and we can write our own.
            */
            templateUrl: 'app/heroes.component.html',
            styleUrls: ['app/heroes.component.css'],
            directives: [hero_detail_component_1.HeroDetailComponent],
            /*
            The providers array tells Angular to create a fresh instance of the HeroService when it creates a new AppComponent.
            The AppComponent can use that service to get heroes and so can every child component of its component tree.
            */
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_deprecated_1.Router])
    ], HeroesComponent);
    return HeroesComponent;
}());
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map