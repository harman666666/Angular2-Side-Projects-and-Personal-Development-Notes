import { Component, Host, Optional } from '@angular/core';

import { HeroCacheService } from './hero-cache.service';
import { LoggerService }    from './logger.service';

@Component({
  selector: 'hero-contact',
  template: `
  <div>Phone #: {{phoneNumber}}
  <span *ngIf="hasLogger">!!!</span></div>`
})
export class HeroContactComponent {

  hasLogger = false;

    /*
    The @Host() function decorating the heroCache property ensures that we get a reference to the cache service from the parent HeroBioComponent.
    Angular throws if the parent lacks that service, even if a component higher in the component tree happens to have that service.

A second @Host() function decorates the loggerService property.
    We know the only LoggerService instance in the app is provided at the AppComponent level.
    The host HeroBioComponent doesn't have its own LoggerService provider.

Angular would throw an error if we hadn't also decorated the property with the @Optional() function.
    Thanks to @Optional(), Angular sets the loggerService to null and the rest of the component adapts.
    */
  constructor(
      @Host() // limit to the host component's instance of the HeroCacheService
      private heroCache: HeroCacheService,

      @Host()     // limit search for logger; hides the application-wide logger
      @Optional() // ok if the logger doesn't exist
      private loggerService: LoggerService
  ) {
    if (loggerService) {
      this.hasLogger = true;
      loggerService.logInfo('HeroContactComponent can log!');
    }
  }

  get phoneNumber() { return this.heroCache.hero.phone; }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/