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
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require('@angular/core');
require('rxjs/RX'); //Import all of rxjs
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///INPUTS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
When the user clicks a link, pushes a button, or enters text we want to know about it.
These user actions all raise DOM events. In this chapter we learn to bind to those events using the Angular event binding syntax.
*/
var ClickMeComponent = (function () {
    function ClickMeComponent() {
        this.clickMessage = '';
    }
    ClickMeComponent.prototype.onClickMe = function () {
        this.clickMessage = 'You are my hero!';
    };
    ClickMeComponent = __decorate([
        core_1.Component({
            selector: 'click-me',
            template: "\n    <button (click)=\"onClickMe()\">Click me!</button>\n    {{clickMessage}}"
        }), 
        __metadata('design:paramtypes', [])
    ], ClickMeComponent);
    return ClickMeComponent;
}());
exports.ClickMeComponent = ClickMeComponent;
/*
Let's bind to the keyup event of an input box and replay what the user types back onto the screen.

template: `
  <input (keyup)="onKey($event)">
  <p>{{values}}</p>

Angular makes an event object available in the $event variable, which we pass to the component's onKey() method. The user data we want is in that variable somewhere.
The shape of the $event object is determined by whatever raises the event.
The keyup event comes from the DOM, so $event must be a standard DOM event object.
The $event.target gives us an HTMLInputElement, which has a value property that contains our user input data.
*/
var KeyUpComponent_v1 = (function () {
    function KeyUpComponent_v1() {
        this.values = '';
    }
    // without strong typing
    KeyUpComponent_v1.prototype.onKey = function (event) {
        this.values += event.target.value + ' | ';
    };
    KeyUpComponent_v1 = __decorate([
        core_1.Component({
            selector: 'keyup',
            template: "\n  <input (keyup)=\"onKey($event)\">\n  <p>{{values}}</p>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], KeyUpComponent_v1);
    return KeyUpComponent_v1;
}());
exports.KeyUpComponent_v1 = KeyUpComponent_v1;
//bootstrap(KeyUpComponent_v1);
var KeyUpComponent_v2 = (function () {
    function KeyUpComponent_v2() {
        this.values = '';
    }
    KeyUpComponent_v2.prototype.onKey = function (value) {
        this.values += value + ' | ';
    };
    KeyUpComponent_v2 = __decorate([
        core_1.Component({
            selector: 'keyup',
            template: "\n    <input #box (keyup)=\"onKey(box.value)\">\n    <p>{{values}}</p>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], KeyUpComponent_v2);
    return KeyUpComponent_v2;
}());
exports.KeyUpComponent_v2 = KeyUpComponent_v2;
//bootstrap(KeyUpComponent_v2);
/*Angular can filter the key events for us.Angular has a special syntax for keyboard events.
We can listen for just the Enter key by binding to Angular's keyup.enter pseudo-event.
Only then do we update the component's values property.
(In this example, the update happens inside the event binding statement.
A better practice would be to put the update code in the component.)
*/
var KeyUpComponent_v3 = (function () {
    function KeyUpComponent_v3() {
        this.values = '';
    }
    KeyUpComponent_v3 = __decorate([
        core_1.Component({
            selector: 'keyup',
            template: "\n    <input #box (keyup.enter)=\"values=box.value\">\n    <p>{{values}}</p>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], KeyUpComponent_v3);
    return KeyUpComponent_v3;
}());
exports.KeyUpComponent_v3 = KeyUpComponent_v3;
//bootstrap(KeyUpComponent_v3);
//Our previous example won't transfer the current state of the input box if the user mouses away and clicks elsewhere on the page. 
//We update the component's values property only when the user presses Enter while the focus is inside the input box.
//Let's fix that by listening to the input box's blur event as well.
var KeyUpComponent_v4 = (function () {
    function KeyUpComponent_v4() {
        this.values = '';
    }
    KeyUpComponent_v4 = __decorate([
        core_1.Component({
            selector: 'keyup',
            template: "\n    <input #box\n      (keyup.enter)=\"values=box.value\"\n      (blur)=\"values=box.value\"> <!-- blur event occurs when user mouses away -->\n\n    <p>{{values}}</p>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], KeyUpComponent_v4);
    return KeyUpComponent_v4;
}());
exports.KeyUpComponent_v4 = KeyUpComponent_v4;
//bootstrap(KeyUpComponent_v4);
var LittleTourComponent = (function () {
    function LittleTourComponent() {
        this.heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];
    }
    LittleTourComponent.prototype.addHero = function (newHero) {
        if (newHero) {
            this.heroes.push(newHero);
        }
    };
    LittleTourComponent = __decorate([
        core_1.Component({
            selector: 'little-tour',
            template: "\n    <input #newHero\n      (keyup.enter)=\"addHero(newHero.value)\"\n      (blur)=\"addHero(newHero.value); newHero.value='' \">\n\n    <button (click)=addHero(newHero.value)>Add</button>\n\n    <ul><li *ngFor=\"let hero of heroes\">{{hero}}</li></ul>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LittleTourComponent);
    return LittleTourComponent;
}());
exports.LittleTourComponent = LittleTourComponent;
/*
The newHero template variable refers to the <input> element. We can use newHero from any sibling or child of the <input> element.
Getting the element from a template variable makes the button click handler simpler. Without the variable, we'd have to use a fancy CSS selector to find the input element.

*/
//bootstrap(LittleTourComponent);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////FORMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Hero = (function () {
    function Hero(id, name, power, alterEgo) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.alterEgo = alterEgo;
    }
    return Hero;
}());
exports.Hero = Hero;
var HeroFormComponent = (function () {
    function HeroFormComponent() {
        this.powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
        //When you  click,
        //The error messages are hidden because the form is pristine; we haven't changed anything yet.
        //  newHero() {
        //      this.model = new Hero(42, '', '');
        //  }
        this.active = true;
        this.model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
        this.submitted = false;
    }
    HeroFormComponent.prototype.newHero = function () {
        var _this = this;
        this.model = new Hero(42, '', '');
        this.active = false;
        setTimeout(function () { return _this.active = true; }, 0);
        /*
        With NgIf bound to the active flag, clicking "New Hero" removes the form from the DOM and
        recreates it in a blink of an eye. The re-created form is in a pristine state.
        The error message is hidden.

        Gets it back to pristine condition
        */
    };
    HeroFormComponent.prototype.onSubmit = function () { this.submitted = true; };
    Object.defineProperty(HeroFormComponent.prototype, "diagnostic", {
        // TODO: Remove this when we're done
        get: function () { return JSON.stringify(this.model); },
        enumerable: true,
        configurable: true
    });
    HeroFormComponent = __decorate([
        core_1.Component({
            selector: 'hero-form',
            /*
            A form isn't just about data binding.
            We'd also like to know the state of the controls on our form.
            By setting ngControl we create a directive that
            can tell if the user touched the control, if the value changed,
            or if the value became invalid.
            This directive doesn't just track state;
            it updates the control with special Angular CSS classes from the set we listed above.
            We can leverage those class names to change the appearance of the control and make messages appear or disappear.
        
            Internally Angular creates Controls and registers them under their ngControl names with
            an NgForm directive that Angular attached to the <form> tag.
            We'll talk about NgForm later in the chapter.
            The ngControl attribute in our template actually maps to the NgControlName directive.
            There is also a NgControl abstract directive which is not the same thing.
            We often ignore this technical distinction and refer to NgControlName
            more conveniently (albeit incorrectly) as the NgControl directive.
        
        State	                  Class if true	Class if false
        Control has been visited	ng-touched	ng-untouched
        Control's value has changed	ng-dirty	ng-pristine
        Control's value is valid	ng-valid	ng-invalid
        
        The user should be able to submit this form after filling it in.
        The Submit button at the bottom of the form does nothing on its own
        but it will trigger a form submit because of its type (type="submit").
        
        A "form submit" is useless at the moment.
        To make it useful, we'll update the <form> tag with another Angular directive,
        NgSubmit, and bind it to the HeroFormComponent.submit() method with an event binding
            */
            template: "\n<div class=\"container\">\n  <div  [hidden]=\"submitted\">\n    <h1>Hero Form</h1>\n    <form *ngIf=\"active\" (ngSubmit)=\"onSubmit()\" #heroForm=\"ngForm\">\n     {{diagnostic}}\n<div class=\"form-group\">\n   <label for=\"name\">Name</label>\n        <input type=\"text\" class=\"form-control\" required\n          [(ngModel)]=\"model.name\"\n            ngControl=\"name\" #name=\"ngForm\" >\n        <div [hidden]=\"name.valid || name.pristine\" class=\"alert alert-danger\">\n          Name is required\n        </div>\n\n<!--The (ng-valid | ng-invalid) pair are most interesting to us. \nWe want to send a strong visual signal when the data are invalid and we want to mark required fields.\nWe realize we can do both at the same time with a colored bar on the left of the input box:\nIn this example, we hide the message when the control is valid or pristine; \npristine means the user hasn't changed the value since it was displayed in this form.\n-->\n\n</div>\n<div class=\"form-group\">\n  <label for=\"alterEgo\">Alter Ego</label>\n  <input type=\"text\"  class=\"form-control\"\n    [(ngModel)]=\"model.alterEgo\">\n</div>\n<div class=\"form-group\">\n  <label for=\"power\">Hero Power</label>\n  <select class=\"form-control\"  required\n    [(ngModel)]=\"model.power\" >\n    <option *ngFor=\"let p of powers\" [value]=\"p\">{{p}}</option>\n  </select>\n</div>\n      <button type=\"submit\" class=\"btn btn-default\" \n                            [disabled]=\"!heroForm.form.valid\">Submit</button>\n    </form>\n</div>\n<div [hidden]=\"!submitted\">\n  <h2>You submitted the following:</h2>\n  <div class=\"row\">\n    <div class=\"col-xs-3\">Name</div>\n    <div class=\"col-xs-9  pull-left\">{{ model.name }}</div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-xs-3\">Alter Ego</div>\n    <div class=\"col-xs-9 pull-left\">{{ model.alterEgo }}</div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-xs-3\">Power</div>\n    <div class=\"col-xs-9 pull-left\">{{ model.power }}</div>\n  </div>\n  <br>\n  <button class=\"btn btn-default\" (click)=\"submitted=false\">Edit</button>\n</div>\n<button type=\"button\" class=\"btn btn-default\" (click)=\"newHero()\">New Hero</button>\n</div>\n",
            styles: [".ng-valid[required] {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid {\n  border-left: 5px solid #a94442; /* red */\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormComponent);
    return HeroFormComponent;
}());
exports.HeroFormComponent = HeroFormComponent;
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: '<hero-form></hero-form>',
            directives: [HeroFormComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
platform_browser_dynamic_1.bootstrap(AppComponent);
//# sourceMappingURL=appz - Copy.js.map