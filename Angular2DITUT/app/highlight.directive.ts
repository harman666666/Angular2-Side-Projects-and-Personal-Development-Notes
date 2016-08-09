import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})

export class HighlightDirective {
/*
    The directive sets the background to a highlight color when the user mouses over the DOM element to which it is applied.
    */

  @Input('myHighlight') highlightColor: string;

  private el: HTMLElement;
/*
    Angular set the constructor's el parameter to the injected ElementRef which is a wrapper around that DOM element.
    Its nativeElement property exposes the DOM element for the directive to manipulate.

 The sample code applies the directive's myHighlight attribute to two <div> tags, first without a value (yielding the default color) and then with an assigned color value.

app/app.component.html (highlight)

<div id="highlight"  class="di-component"  myHighlight>
  <h3>Hero Bios and Contacts</h3>
  <div myHighlight="yellow">
    <hero-bios-and-contacts></hero-bios-and-contacts>
  </div>
</div>
Color effect of mousing over the <hero-bios-and-contacts> tag.


    */
  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'cyan');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/