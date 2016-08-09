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
var HighlightDirective = (function () {
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
    function HighlightDirective(el) {
        this.el = el.nativeElement;
    }
    HighlightDirective.prototype.onMouseEnter = function () {
        this.highlight(this.highlightColor || 'cyan');
    };
    HighlightDirective.prototype.onMouseLeave = function () {
        this.highlight(null);
    };
    HighlightDirective.prototype.highlight = function (color) {
        this.el.style.backgroundColor = color;
    };
    __decorate([
        core_1.Input('myHighlight'), 
        __metadata('design:type', String)
    ], HighlightDirective.prototype, "highlightColor", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighlightDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighlightDirective.prototype, "onMouseLeave", null);
    HighlightDirective = __decorate([
        core_1.Directive({
            selector: '[myHighlight]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HighlightDirective);
    return HighlightDirective;
}());
exports.HighlightDirective = HighlightDirective;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=highlight.directive.js.map