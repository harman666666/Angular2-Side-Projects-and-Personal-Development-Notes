import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { AppComponent } from './app.component';

/*
During bootstrap we have to register the new forms module by calling provideForms() and pass the result to the provider array.
Many of us will build forms by writing templates in the Angular template syntax with the form-specific directives and techniques described in this chapter.
*/
bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms()
 ])
 .catch((err: any) => console.error(err));


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/