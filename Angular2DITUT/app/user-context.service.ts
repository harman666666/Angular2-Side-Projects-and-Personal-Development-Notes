import { Injectable }    from '@angular/core';

import { LoggerService } from './logger.service';
import { UserService }   from './user.service';

//Notice the @Injectable()decorator on the UserContextService class.
/*
That decorator makes it possible for Angular to identify the types of its two dependencies,
LoggerService and UserService.

Technically, the @Injectable()decorator is only required for a service class that has its own dependencies.
The LoggerService doesn't depend on anything.
The logger would work if we omitted @Injectable() and the generated code would be slightly smaller.

But the service would break the moment we gave it a dependency and we'd have to go back and and add @Injectable() to fix it.
*/
@Injectable()
export class UserContextService {

    /*
    The AppComponent class had two dependencies as well but no @Injectable().
    It didn't need @Injectable() because that component class has the @Component decorator.
    In Angular with TypeScript, a single decorator — any decorator — is sufficient to identify dependency types.
    */

  name: string;
  role: string;
  loggedInSince: Date;

  constructor(private userService: UserService, private loggerService: LoggerService) {
    this.loggedInSince = new Date();
  }

  loadUser(userId: number) {
    let user = this.userService.getUserById(userId);
    this.name = user.name;
    this.role = user.role;

    this.loggerService.logDebug('loaded User');
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/