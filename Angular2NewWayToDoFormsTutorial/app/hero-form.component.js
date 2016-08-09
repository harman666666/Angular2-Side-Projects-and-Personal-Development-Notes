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
var hero_1 = require('./hero');
var HeroFormComponent = (function () {
    function HeroFormComponent() {
        this.powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
        this.model = new hero_1.Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
        this.submitted = false;
        // Reset the form with a new hero AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        this.active = true;
    }
    //Start by wrapping the form in a <div> and bind its hidden property to the HeroFormComponent.submitted property.
    //The main form is visible from the start because the the submitted property is false until we submit the form, 
    //as this fragment from the HeroFormComponent reminds us:
    //When we click the Submit button, the submitted flag becomes true and the form disappears as planned.
    //  <div  [hidden]="submitted">
    HeroFormComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(HeroFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    HeroFormComponent.prototype.newHero = function () {
        var _this = this;
        this.model = new hero_1.Hero(42, '', '');
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
        /*
        Run the application again, click the New Hero button, and the form clears. The required bars to the left of the input box are red,
        indicating invalid name and power properties.
        That's understandable as these are required fields. The error messages are
        hidden because the form is pristine; we haven't changed anything yet.
        Enter a name and click New Hero again. This time we see an error message! Why?
        We don't want that when we display a new (empty) hero.
        Inspecting the element in the browser tools reveals that the name input box is no longer pristine.
        Replacing the hero did not restore the pristine state of the control.
        Upon reflection, we realize that Angular cannot distinguish between replacing the entire hero and
        clearing the name property programmatically. Angular makes no assumptions and leaves the control in its current, dirty state.
        We'll have to reset the form controls manually with a small trick. We add an active flag to the component, initialized to true.
         When we add a new hero, we toggle active false and then immediately back to true with a quick setTimeout. => ngIf template trick
        */
    };
    //////// NOT SHOWN IN DOCS ////////
    // Reveal in html:
    //   Name via form.controls = {{showFormControls(heroForm)}}
    HeroFormComponent.prototype.showFormControls = function (form) {
        return form && form.controls['name'] &&
            form.controls['name'].value; // Dr. IQ
    };
    HeroFormComponent = __decorate([
        core_1.Component({
            selector: 'hero-form',
            templateUrl: 'app/hero-form.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormComponent);
    return HeroFormComponent;
}());
exports.HeroFormComponent = HeroFormComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero-form.component.js.map