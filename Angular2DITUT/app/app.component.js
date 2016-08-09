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
var hero_bios_component_1 = require('./hero-bios.component');
var hero_of_the_month_component_1 = require('./hero-of-the-month.component');
var sorted_heroes_component_1 = require('./sorted-heroes.component');
var highlight_directive_1 = require('./highlight.directive');
var parent_finder_component_1 = require('./parent-finder.component');
var DIRECTIVES = [
    hero_bios_component_1.HeroBiosComponent, hero_bios_component_1.HeroBiosAndContactsComponent,
    sorted_heroes_component_1.HeroesBaseComponent, sorted_heroes_component_1.SortedHeroesComponent,
    hero_of_the_month_component_1.HeroOfTheMonthComponent,
    highlight_directive_1.HighlightDirective,
    parent_finder_component_1.ParentFinderComponent
];
var logger_service_1 = require('./logger.service');
var user_context_service_1 = require('./user-context.service');
var user_service_1 = require('./user.service');
var AppComponent = (function () {
    /*
    The consumer of an injected service does not know how to create that service.
    It shouldn't care. It's the dependency injection's job to create and cache that service.
    
    Sometimes a service depends on other services ... which may depend on yet other services.
    Resolving these nested dependencies in the correct order is also the framework's job.
    At each step, the consumer of dependencies simply declares what it
    requires in its constructor and the framework takes over.
    
    
    When Angular creates anAppComponent, the dependency
    injection framework creates an instance of the LoggerService and starts to create the UserContextService.
    The UserContextService needs the LoggerService, which the framework already has, and the UserService,
    which it has yet to create. The UserService has no dependencies so the dependency injection framework can just new one into existence.
    
    The beauty of dependency injection is that the author of AppComponent didn't care about any of this.
    The author simply declared what was needed in the constructor (LoggerService and UserContextService) and the framework did the rest.
        */
    function AppComponent(logger, userContext) {
        this.userContext = userContext;
        this.userId = 1;
        userContext.loadUser(this.userId);
        logger.logInfo('AppComponent initialized');
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            directives: DIRECTIVES,
            providers: [logger_service_1.LoggerService, user_context_service_1.UserContextService, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [logger_service_1.LoggerService, user_context_service_1.UserContextService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
Limit service scope to a component subtree
All injected service dependencies are singletons meaning that, for a given dependency injector ("injector"), there is only one instance of service.
By default, a service dependency provided in one component is visible to all of its child components and Angular
injects the same service instance into all child components that ask for that service.
Sometimes we want to restrict service availability to a particular region of the application.

We can limit the scope of an injected service to a branch of the application hierarchy by providing that service at the
sub-root component for that branch. Here we provide the HeroService to the HeroesBaseComponent by listing it in the providers array:
When Angular creates the HeroesBaseComponent, it also creates a new instance of HeroService that is visible only to the component and its children (if any).

SANDBOXING
Sometimes,
We need a separate instance of the service for each component.
Each service has its own work-state, isolated from the service-and-state of a different component.
We call this sandboxing because each service and component instance has its own sandbox to play in.
Go to HeroBiosComponent and HeroBioComponent to see this
*/
/*
Qualify dependency lookup with @Optional and @Host
We learned that dependencies can be registered at any level in the component hierarchy.
When a component requests a dependency, Angular starts with that component's injector
and walks up the injector tree until it finds the first suitable provider.
Angular throws an error if it can't find the dependency during that walk.
We want this behavior most of the time.
But sometimes we need to limit the search and/or accommodate a missing dependency.
We can modify Angular's search behavior with the @Host and @Optional qualifying decorators, used individually or together.

The @Optional decorator tells Angular to continue when it can't find the dependency. Angular sets the injection parameter to null instead.

The @Host decorator stops the upward search at the host component.

The host component is typically the component requesting the dependency.
But when this component is projected into a parent component, that parent component becomes the host.
 We look at this second, more interesting case in our next example. => Hero Bios Component, Hero Contact Component



INJECT THE COMPONENTS ELEMENT
On occasion we might need to access a component's corresponding DOM element.
Although we strive to avoid it, many visual effects and 3rd party tools (such as jQuery) require DOM access.
To illustrate, we've written a simplified version of the HighlightDirective from the Attribute Directives chapter.

DEFINE DEPENDENCIES WITH PROVIDERS

We get a service from a dependency injector by giving it a token.

We usually let Angular handle this transaction for us by specifying a constructor parameter and its type.
The parameter type serves as the injector lookup token.
Angular passes this token to the injector and assigns the result to the parameter.
Where did the injector get that value? It may already have that value in its internal container.
If it doesn't, it may be able to make one with the help of a provider.
A provider is a recipe for delivering a service associated with a token.
A new injector has no providers.
Angular initializes the injectors it creates with some providers it cares about.
We have to register our own application providers manually,
usually in the providers array of the Component or Directive metadata:

Defining providers
The simple class provider is the most typical by far. We mention the class in the providers array and we're done.

providers: [HeroService]

It's that simple because the most common injected service is an instance of a class.
But not every dependency can be satisfied by creating a new instance of a class.

The HeroOfTheMonthComponent example demonstrates many of the alternatives and why we need them.


Inject into a derived class

We must take care when writing a component that inherits from another component.
If the base component has injected dependencies, we must re-provide and re-inject
them in the derived class and then pass them down to the base class through the constructor.
In this contrived example, SortedHeroesComponent inherits from HeroesBaseComponent to display a sorted list of heroes.

Find a parent component by injection

Application components often need to share information. We prefer the more loosely coupled
techniques such as data binding and service sharing. But sometimes it makes sense for one
component to have a direct reference to another component perhaps to access values or
call methods on that component.
There is an API for acquiring a child reference (checkout Query, QueryList, ViewChildren, and ContentChildren).
There is no public API for acquiring a parent reference. But because every component instance is added to an injector's container,
we can use Angular dependency injection to reach a parent component.
look at parent finder component
*/ 
//# sourceMappingURL=app.component.js.map