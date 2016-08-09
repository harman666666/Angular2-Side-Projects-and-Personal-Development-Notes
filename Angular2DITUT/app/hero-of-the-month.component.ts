/* tslint:disable:one-line:check-open-brace*/
import { OpaqueToken } from '@angular/core';

export const TITLE = new OpaqueToken('title');

import { Component, Inject } from '@angular/core';

import { DateLoggerService,
         MinimalLogger }     from './date-logger.service';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';
import { LoggerService }     from './logger.service';
import { RUNNERS_UP,
         runnersUpFactory }  from './runners-up';

const someHero = new Hero(42, 'Magma', 'Had a great month!', '555-555-5555');

const template = `
  <h3>{{title}}</h3>
  <div>Winner: <strong>{{heroOfTheMonth.name}}</strong></div>
  <div>Reason for award: <strong>{{heroOfTheMonth.description}}</strong></div>
  <div>Runners-up: <strong id="rups1">{{runnersUp}}</strong></div>

  <p>Logs:</p>
  <div id="logs">
    <div *ngFor="let log of logs">{{log}}</div>
  </div>
  `;

@Component({
  selector: 'hero-of-the-month',
  template: template,
  providers: [
    { provide: Hero,          useValue:    someHero },
    { provide: TITLE,         useValue:   'Hero of the Month' },
    { provide: HeroService,   useClass:    HeroService },
    { provide: LoggerService, useClass:    DateLoggerService },
    { provide: MinimalLogger, useExisting: LoggerService },
    { provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }
  ]
})
/*
The provide object literal takes a token and a definition object. The token is usually a class but it doesn't have to be.

The definition object has one main property, (e.g. useValue) that indicates how the provider should create or return the provided value.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    USEVALUE
Set the useValue property to a fixed value that the provider can return as the dependency object.

Use this technique to provide runtime configuration constants such as web-site base addresses and feature flags.
We often use a value provider in a unit test to replace a production service with a fake or mock.

The HeroOfTheMonthComponent example has two value providers. The first provides an instance of the Hero class; the second specifies a literal string resource:
The Hero provider token is a class which makes sense because the value is a Hero and the consumer of the injected hero would want the type information.

The TITLE provider token is not a class. It's a special kind of provider lookup key called an OpaqueToken.
    We often use an OpaqueToken when the dependency is a simple value like a string, a number, or a function.

The value of a value provider must be defined now. We can't create the value later. Obviously the title string
literal is immediately available. The someHero variable in this example was set earlier in the file:

    USECLASS
The useClass provider creates and returns new instance of the specified class.

Use this technique to substitute an alternative implementation for a common or default class.
The alternative could implement a different strategy, extend the default class, or fake the behavior of the real class in a test case.

We see two examples in the HeroOfTheMonthComponent:


{ provide: HeroService,   useClass:    HeroService },
{ provide: LoggerService, useClass:    DateLoggerService },

The first provider is the de-sugared, expanded form of the most typical
case in which the class to be created (HeroService) is also the provider's injection token.
The second provider substitutes the DateLoggerService for the LoggerService.
The LoggerService is already registered at the AppComponent level. When this component requests the LoggerService,
it receives the DateLoggerService instead.
This component and its tree of child components receive the DateLoggerService instance.
Components outside the tree continue to receive the original LoggerService instance.

    USE EXISTING
The useExisting provider maps one token to another.
    In effect, the first token is an alias for the service associated with second token, creating two ways to access the same service object.
Narrowing an API through an aliasing interface is one important use case for this technique.
    We're aliasing for that very purpose here.
  Imagine that the LoggerService had a large API (it's actually only three methods and a property).
    We want to shrink that API surface to just the two members exposed by the MinimalLogger
    The constructor's logger parameter is typed as MinimalLogger so only its two members are visible in TypeScript:

    USE FACTORY
The useFactory provider creates a dependency object by calling a factory function as seen in this example.
    { provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }
      
Use this technique to create a dependency object with a factory function whose inputs are some combination of injected services and local state.
The dependency object doesn't have to be a class instance.
It could be anything.
In this example, the dependency object is a string of the names of the runners-up to the "Hero of the Month" contest.
The local state is the number 2, the number of runners- up this component should show.We execute runnersUpFactory immediately with 2.
The runnersUpFactory itself isn't the provider factory function. The true provider factory function is the function that runnersUpFactory returns.

export function runnersUpFactory(take: number) {
  return (winner: Hero, heroService: HeroService): string => {
     ... 
  };
};
That returned function takes a winning Hero and a HeroService as arguments.
Angular supplies these arguments from injected values identified by the two tokens in the deps array.
The two deps values are tokens that the injector uses to provide these factory function dependencies.
After some undisclosed work, the function returns the string of
names and Angular injects it into the runnersUp parameter of the HeroOfTheMonthComponent.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
The token doesn't have to be a class and even when it is a class, it doesn't have to be the same type as the returned object. That's the subject of our next section.
CLASS INTERFACE

In the previous Hero of the Month example, we used the MinimalLogger class as the token for a provider of a LoggerService.

{ provide: MinimalLogger, useExisting: LoggerService },
The MinimalLogger is an abstract class.

// class used as a restricting interface (hides other public members)
export abstract class MinimalLogger {
  logInfo: (msg: string) => void;
  logs: string[];
}
We usually inherit from an abstract class.
But LoggerService doesn't inherit from MinimalLogger.
No class inherits from it. Instead, we use it like an interface.
Look again at the declaration for DateLoggerService

export class DateLoggerService extends LoggerService implements MinimalLogger

DateLoggerService inherits (extends) from LoggerService, not MinimalLogger.
The DateLoggerService implements MinimalLogger as if MinimalLogger were an interface.
We call a class used in this way a class-interface.
The key benefit of a class-interface is that we can get the strong-typing of an interface
and we can use it as a provider token in the same manner as a normal class.
A class-interface should define only the members that its consumers are allowed to call.
Such a narrowing interface helps decouple the concrete class from its consumers.
The MinimalLogger defines just two of the LoggerClass members.
We can't use an interface as a provider token because interfaces are not JavaScript objects.
They exist only in the TypeScript design space. They disappear after the code is transpiled to JavaScript.
A provider token must be a real JavaScript object of some kind: a function, an object, a string ... a class.
Using a class as an interface gives us the characteristics of an interface in a JavaScript object.

OPAQUE TOKENS

Dependency objects can be simple values like dates, numbers and strings or shapeless objects like arrays and functions.
Such objects don't have application interfaces and therefore aren't well represented by a class.
They're better represented by a token that is both unique and symbolic,
a JavaScript object that has a friendly name but won't conflict with another token that happens to have the same name.
The OpaqueToken has these characteristics. We encountered them twice in the Hero of the Month example,
in the title value provider and in the runnersUp factory provider.


{ provide: TITLE,         useValue:   'Hero of the Month' },
{ provide: RUNNERS_UP,    useFactory:  runnersUpFactory(2), deps: [Hero, HeroService] }

We created the TITLE token like this:

import { OpaqueToken } from '@angular/core';

export const TITLE = new OpaqueToken('title');


    */
export class HeroOfTheMonthComponent {
  logs: string[] = [];

  constructor(
      logger: MinimalLogger,
      public heroOfTheMonth: Hero,
      @Inject(RUNNERS_UP) public runnersUp: string, //Need to Inject these explicitely to use them
      @Inject(TITLE) public title: string) //Need to Inject these explicitely to use them
  {
    this.logs = logger.logs;
    logger.logInfo('starting up');
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/