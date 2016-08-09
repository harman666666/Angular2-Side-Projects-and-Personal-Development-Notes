import { Component }         from '@angular/core';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

import { HeroListComponent }        from './toh/hero-list.component';
import { HeroListPromiseComponent } from './toh/hero-list.component.promise';

import { WikiComponent }      from './wiki/wiki.component';
import { WikiSmartComponent } from './wiki/wiki-smart.component';

@Component({
  selector: 'my-app',
  template: `
    <hero-list></hero-list>
    <hero-list-promise></hero-list-promise>
    <my-wiki></my-wiki>
    <my-wiki-smart></my-wiki-smart>
  `,
/*
  providers: [ HTTP_PROVIDERS ]
*/
  directives: [
    HeroListComponent, HeroListPromiseComponent,
    WikiComponent, WikiSmartComponent
  ]
})
export class AppComponent { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/