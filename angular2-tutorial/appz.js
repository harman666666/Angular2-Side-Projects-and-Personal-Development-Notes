"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var core_2 = require('@angular/core');
var core_3 = require('@angular/core');
require('rxjs/RX'); //Import all of rxjs
var Observable_1 = require('rxjs/Observable'); //dint import behaviour subject
var http_1 = require('@angular/http');
// Add the RxJS Observable operators we need in this app.
//import './rxjs-operators';
var core_4 = require('@angular/core');
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
//////DEPRICATED FORMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            styles: ["\n\n\n.ng-valid[required] {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid {\n  border-left: 5px solid #a94442; /* red */\n}\n"]
        }), 
        __metadata('design:paramtypes', [])
    ], HeroFormComponent);
    return HeroFormComponent;
}());
exports.HeroFormComponent = HeroFormComponent;
var AppComponentzzz = (function () {
    function AppComponentzzz() {
    }
    AppComponentzzz = __decorate([
        core_1.Component({
            selector: 'my-appzzz',
            template: '<hero-form></hero-form>',
            directives: [HeroFormComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponentzzz);
    return AppComponentzzz;
}());
exports.AppComponentzzz = AppComponentzzz;
//bootstrap(AppComponentzzz);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////NEW WAY TO DO FORMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
We start by showing how to bootstrap the application and add the necessary dependencies to use forms.
During bootstrap we have to register the new forms module by calling provideForms() and pass the result to the provider array.

imporrt { bootstrap }    from '@angular/platform-browser-dynamic';
imporrt { disableDeprecatedForms, provideForms } from '@angular/forms';
imporrt { AppComponent } from './app.component';
bootstrrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms()
 ])
 .catch((err: any) => console.error(err));
LOOK AT SEPERATE TUTORIAL FOR REST
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////Pipes//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/*
A pipe takes in data as input and transforms it to a desired output. We'll illustrate by transforming a component's birthday property into a human-friendly date.
*/
var HeroBirthdayComponent = (function () {
    function HeroBirthdayComponent() {
        this.birthday = new Date(1988, 3, 15); // April 15, 1988
    }
    HeroBirthdayComponent = __decorate([
        core_1.Component({
            selector: 'hero-birthday',
            template: "<p>The hero's birthday is {{ birthday | date }}</p>"
        }), 
        __metadata('design:paramtypes', [])
    ], HeroBirthdayComponent);
    return HeroBirthdayComponent;
}());
exports.HeroBirthdayComponent = HeroBirthdayComponent;
/*
Inside the interpolation expression we flow the component's birthday value through the pipe operator ( | ) to the Date pipe function on the right. All pipes work this way.
*/
//bootstrap(HeroBirthdayComponent);
//Angular comes with a stock of pipes such as DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe. 
//They are all immediately available for use in any template.
/*
A pipe may accept any number of optional parameters to fine-tune its output. We add parameters to a pipe by following the pipe name with a colon ( : )
and then the parameter value (e.g., currency:'EUR'). If our pipe accepts multiple parameters, we separate the values with colons (e.g. slice:1:5)

We'll modify our birthday template to give the date pipe a format parameter. After formatting the hero's April 15th birthday, it should render as 04/15/88:


<p>The hero's birthday is {{ birthday | date:"MM/dd/yy" }} </p>

*/
//You can toggle the format of the birthday using a pipe 
var HeroBirthdayComponent2 = (function () {
    function HeroBirthdayComponent2() {
        this.birthday = new Date(1988, 3, 15); // April 15, 1988
        this.toggle = true; // start with true == shortDate
    }
    Object.defineProperty(HeroBirthdayComponent2.prototype, "format", {
        get: function () { return this.toggle ? 'shortDate' : 'fullDate'; },
        enumerable: true,
        configurable: true
    });
    HeroBirthdayComponent2.prototype.toggleFormat = function () { this.toggle = !this.toggle; };
    HeroBirthdayComponent2 = __decorate([
        core_1.Component({
            selector: 'hero-birthday2',
            template: "<p>The hero's birthday is {{ birthday | date:format }}</p>\n    < button(click)=\"toggleFormat()\">Toggle Format</button >\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], HeroBirthdayComponent2);
    return HeroBirthdayComponent2;
}());
exports.HeroBirthdayComponent2 = HeroBirthdayComponent2;
/*
We can chain pipes together in potentially useful combinations. In the following example,
we chain the birthday to the DatePipe and on to the UpperCasePipe so we can display the birthday in uppercase. The following birthday displays as APR 15, 1988.


The chained hero's birthday is
{{ birthday | date | uppercase}}
This example — which displays FRIDAY, APRIL 15, 1988 — chains the same pipes as above, but passes in a parameter to date as well.


The chained hero's birthday is
{{  birthday | date:'fullDate' | uppercase}}
*/
/*
We can write our own custom pipes. Here's a custom pipe named ExponentialStrengthPipe:
A pipe is a class decorated with pipe metadata.
The pipe class implements the PipeTransform interface's transform method that accepts an input value followed by optional parameters and returns the transformed value.
There will be one additional argument to the transform method for each parameter passed to the pipe. Our pipe has one such parameter: the exponent.
We tell Angular that this is a pipe by applying the @Pipe decorator which we import from the core Angular library.
The @Pipe decorator allows us to define the pipe name that we'll use within template expressions. It must be a valid
JavaScript identifier. Our pipe's name is exponentialStrength.
We use our custom pipe the same way we use the built-in pipes.
We must include our pipe in the pipes array of the @Component decorator.
*/
var ExponentialStrengthPipe = (function () {
    function ExponentialStrengthPipe() {
    }
    ExponentialStrengthPipe.prototype.transform = function (value, exponent) {
        var exp = parseFloat(exponent);
        return Math.pow(value, isNaN(exp) ? 1 : exp);
    };
    ExponentialStrengthPipe = __decorate([
        core_4.Pipe({ name: 'exponentialStrength' }), 
        __metadata('design:paramtypes', [])
    ], ExponentialStrengthPipe);
    return ExponentialStrengthPipe;
}());
exports.ExponentialStrengthPipe = ExponentialStrengthPipe;
var PowerBoosterComponent = (function () {
    function PowerBoosterComponent() {
    }
    PowerBoosterComponent = __decorate([
        core_1.Component({
            selector: 'power-boosterzz',
            template: "\n    <h2>Power Booster</h2>\n    <p>Super power boost: {{2 | exponentialStrength: 10}}</p>\n  ",
            pipes: [ExponentialStrengthPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], PowerBoosterComponent);
    return PowerBoosterComponent;
}());
exports.PowerBoosterComponent = PowerBoosterComponent;
//bootstrap(PowerBoosterComponent)
var PowerBooseCalculatorComponent = (function () {
    function PowerBooseCalculatorComponent() {
        this.power = 5;
        this.factor = 1;
    }
    PowerBooseCalculatorComponent = __decorate([
        core_1.Component({
            selector: 'power-booster',
            template: "\n    <h2> Power Boost Calculator </h2>\n    <div> Normal Power : <input type = \"text\" [(ngModel)] = \"power\"></div>\n    <div> Boost Factor: <input [(ngModel)] = \"factor\"> </div>\n    <p>\n        Super Hero Power: {{power | exponentialStrength:factor}}\n    </p>\n    ",
            pipes: [ExponentialStrengthPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], PowerBooseCalculatorComponent);
    return PowerBooseCalculatorComponent;
}());
exports.PowerBooseCalculatorComponent = PowerBooseCalculatorComponent;
;
//bootstrap(PowerBooseCalculatorComponent);
/*
Angular looks for changes to data-bound values through a
change detection process that runs after every JavaScript event:
every keystroke, mouse move, timer tick, and server response.
This could be expensive. Angular strives to lower the cost whenever possible and appropriate.

Angular picks a simpler, faster change detection algorithm when we use a pipe. Let's see how.
*/
/*
No Pipe: The component in our next example uses the default, aggressive change detection strategy to monitor and update its display of every hero in the heroes array.
*/
exports.HEROES = [
    { name: 'Windstorm', canFly: true },
    { name: 'Bombasto', canFly: false },
    { name: 'Magneto', canFly: false },
    { name: 'Tornado', canFly: true }
];
var FlyingHeroesPipe = (function () {
    function FlyingHeroesPipe() {
    }
    FlyingHeroesPipe.prototype.transform = function (allHeroes) {
        return allHeroes.filter(function (hero) { return hero.canFly; });
    };
    FlyingHeroesPipe = __decorate([
        core_4.Pipe({ name: 'flyingHeroes' }), 
        __metadata('design:paramtypes', [])
    ], FlyingHeroesPipe);
    return FlyingHeroesPipe;
}());
exports.FlyingHeroesPipe = FlyingHeroesPipe;
var FlyingHeroesComponent = (function () {
    function FlyingHeroesComponent() {
        this.heroes = [];
        this.canFly = true;
        this.reset();
    }
    FlyingHeroesComponent.prototype.canFlyMeth = function (istrue) {
        this.canFly = istrue;
    };
    FlyingHeroesComponent.prototype.addHero = function (name) {
        name = name.trim();
        if (!name) {
            return;
        }
        var hero = { name: name, canFly: this.canFly };
        this.heroes.push(hero);
    };
    FlyingHeroesComponent.prototype.reset = function () { this.heroes = exports.HEROES.slice(); };
    FlyingHeroesComponent = __decorate([
        core_1.Component({
            selector: 'fly',
            template: "\n                <input type = \"text\" #box\n                        (keyup.enter) = \"addHero(box.value); box.value = ''\"\n                         placeholder = \"hero name\">\n                \n                <div>\n                <input type = \"radio\" name = \"canFly\" value = \"true\" checked (click) = \"canFlyMeth(true)\"> You Can Fly <br />\n                <input type = \"radio\" name = \"canFly\" value = \"false\" (click) = \"canFlyMeth(false)\"> You Can't Fly <br />\n                You put: {{canFly}}\n                </div>\n                \n                <button (click) = \"reset()\">Reset</button>\n                <div *ngFor = \"let hero of (heroes | flyingHeroes); let i = index\">  \n                    {{i}} : {{hero.name}}\n                </div> \n              ",
            pipes: [FlyingHeroesPipe]
        }), 
        __metadata('design:paramtypes', [])
    ], FlyingHeroesComponent);
    return FlyingHeroesComponent;
}());
exports.FlyingHeroesComponent = FlyingHeroesComponent;
//bootstrap(FlyingHeroesComponent);
/*
When we run the sample now we see odd behavior (try it in the live example). Every hero we add is a flying hero but none of them are displayed.

Although we're not getting the behavior we want,
Angular isn't broken. It's just using a different change detection algorithm — one that ignores changes to the list or any of its items.

Look at how we're adding a new hero:


this.heroes.push(hero);
We're adding the new hero into the heroes array. The reference to the array hasn't changed. It's the same array.
That's all Angular cares about. From its perspective, same array, no change, no display update.

We can fix that. Let's create a new array with the new hero appended and assign that to heroes.
This time Angular detects that the array reference has changed. It executes the pipe and updates the display with the new array which includes the new flying hero.

If we mutate the array, no pipe is invoked and no display updated;
if we replace the array, then the pipe executes and the display is updated.
*/
/*
Pure and Impure Pipes

There are two categories of pipes: pure and impure.
Pipes are pure by default. Every pipe we've seen
so far has been pure. We make a pipe impure by setting its pure flag to false.

Angular executes a pure pipe only when it detects a pure change to the input value.
A pure change is either a change to a primitive input value (String, Number, Boolean, Symbol)
or a changed object reference (Date, Array, Function, Object).
Angular ignores changes within (composite) objects.
It won't call a pure pipe if we change an input month,
add to an input array, or update an input object property.
This may seem restrictive but is is also fast
 An object reference check is fast — much faster than a deep check for differences —
so Angular can quickly determine if it can skip both the pipe execution and a view update.

Angular executes an impure pipe during every component change detection cycle.
An impure pipe will be called a lot, as often as every keystroke or mouse-move.
With that concern in mind, we must implement an impure pipe with great care.
An expensive, long-running pipe could destroy the user experience.
*/
var FlyingHeroesImpurePipe = (function (_super) {
    __extends(FlyingHeroesImpurePipe, _super);
    function FlyingHeroesImpurePipe() {
        _super.apply(this, arguments);
    }
    FlyingHeroesImpurePipe = __decorate([
        core_4.Pipe({
            name: 'flyingHeroes',
            pure: false //Thats all you have to do
        }), 
        __metadata('design:paramtypes', [])
    ], FlyingHeroesImpurePipe);
    return FlyingHeroesImpurePipe;
}(FlyingHeroesPipe));
exports.FlyingHeroesImpurePipe = FlyingHeroesImpurePipe;
//We inherit from FlyingHeroesPipe to prove the point that nothing changed internally. The only difference is the pure flag in the pipe metadata.
var FlyingHeroesImpureComponent = (function (_super) {
    __extends(FlyingHeroesImpureComponent, _super);
    function FlyingHeroesImpureComponent() {
        _super.apply(this, arguments);
        this.title = 'Flying Heroes (impure pipe)';
    }
    FlyingHeroesImpureComponent = __decorate([
        core_1.Component({
            selector: 'fly',
            template: "\n<h2>{{title}}</h2>\n<p>\nNew hero:\n  <input type=\"text\" #box\n          (keyup.enter)=\"addHero(box.value); box.value=''\"\n          placeholder=\"hero name\">\n  <input id=\"can-fly\" type=\"checkbox\" [(ngModel)]=\"canFly\"> can fly\n</p>\n<p>\n  <input id=\"mutate\" type=\"checkbox\" [(ngModel)]=\"mutate\">Mutate array\n  <button (click)=\"reset()\">Reset</button>\n</p>\n\n<h4>Heroes who fly (piped)</h4>\n<div id=\"flyers\">\n  <div *ngFor=\"let hero of (heroes | flyingHeroes)\">\n    {{hero.name}}\n  </div>\n</div>\n\n<h4>All Heroes (no pipe)</h4>\n<div id=\"all\">\n  <div *ngFor=\"let hero of heroes\">\n    {{hero.name}}\n  </div>\n</div>\n",
            pipes: [FlyingHeroesImpurePipe]
        }), 
        __metadata('design:paramtypes', [])
    ], FlyingHeroesImpureComponent);
    return FlyingHeroesImpureComponent;
}(FlyingHeroesComponent));
exports.FlyingHeroesImpureComponent = FlyingHeroesImpureComponent;
//bootstrap(FlyingHeroesImpureComponent);
/*
The Angular AsyncPipe is an interesting example of an impure pipe.
The AsyncPipe accepts a Promise or Observable as input and subscribes
to the input automatically, eventually returning the emitted value(s).
It is also stateful.
The pipe maintains a subscription to the input Observable and keeps delivering values from that Observable as they arrive.
In this next example, we bind an Observable of message strings (message$) to a view with the async pipe.

*/
var HeroAsyncMessageComponent = (function () {
    function HeroAsyncMessageComponent() {
        this.messages = [
            'You are my hero!',
            'You are the best hero!',
            'Will you be my hero?'
        ];
        this.resend();
    }
    HeroAsyncMessageComponent.prototype.resend = function () {
        var _this = this;
        this.message$ = Observable_1.Observable.interval(500)
            .map(function (i) { return _this.messages[i]; })
            .take(this.messages.length);
    };
    HeroAsyncMessageComponent = __decorate([
        core_1.Component({
            selector: 'hero-message',
            template: "\n    <h2>Async Hero Message and AsyncPipe</h2>\n    <p>Message: {{ message$ | async }}</p>\n    <button (click)=\"resend()\">Resend</button>",
        }), 
        __metadata('design:paramtypes', [])
    ], HeroAsyncMessageComponent);
    return HeroAsyncMessageComponent;
}());
exports.HeroAsyncMessageComponent = HeroAsyncMessageComponent;
/*
     Take=>   Returns a specified number of contiguous elements from the start of an observable sequence, using the specified scheduler for the edge case of take(0)
        Example:
          var source = Rx.Observable.range(0, 5).take(3);
  

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });

// => Next: 0
// => Next: 1
// => Next: 2
// => Completed
        */
/*
Let's write one more impure pipe, a pipe that makes an HTTP request to the server. Normally,
that's a horrible idea. It's probably a horrible idea no matter what we do. We're forging ahead anyway
to make a point. Remember that impure pipes are called every few microseconds.
If we're not careful, this pipe will punish the server with requests.
*/
var FetchJsonPipe = (function () {
    function FetchJsonPipe(_http) {
        this._http = _http;
        this.fetchedJson = null;
        this.prevUrl = '';
    }
    FetchJsonPipe.prototype.transform = function (url) {
        var _this = this;
        /*
        We are careful. Our pipe only makes a server call if the request URL has changed.
        It caches the request URL and waits for a result which it also caches when it arrives.
        The pipe returns the cached result (which is null while a request is in flight)
        after every Angular call and only contacts the server as necessary.
        */
        if (url !== this.prevUrl) {
            this.prevUrl = url;
            this.fetchedJson = null;
            this._http.get(url)
                .map(function (result) { return result.json(); })
                .subscribe(function (result) { return _this.fetchedJson = result; });
        }
        return this.fetchedJson;
    };
    FetchJsonPipe = __decorate([
        core_4.Pipe({
            name: 'fetch',
            pure: false
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FetchJsonPipe);
    return FetchJsonPipe;
}());
exports.FetchJsonPipe = FetchJsonPipe;
var HeroListComponent = (function () {
    function HeroListComponent() {
    }
    HeroListComponent = __decorate([
        core_1.Component({
            selector: 'hero-list',
            template: "\n    <h2>Heroes from JSON File</h2>\n\n    <div *ngFor=\"let hero of ('heroes.json' | fetch) \">\n      {{hero.name}}\n    </div>\n\n    <p>Heroes as JSON:\n    {{'heroes.json' | fetch | json}}\n    </p>\n  ",
            pipes: [FetchJsonPipe],
            providers: [http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], HeroListComponent);
    return HeroListComponent;
}());
exports.HeroListComponent = HeroListComponent;
/*

JsonPipe
The second binding involving the FetchPipe uses more pipe chaining
 We take the same fetched results displayed in the first binding and display them again, this time in JSON format by chaining through to the built-in JsonPipe.

DEBUGGING WITH THE JSON PIPE
The JsonPipe provides an easy way to diagnosis a mysteriously failing data binding or inspect an object for future binding.
*/
//bootstrap(HeroListComponent);
/*
A pure pipe uses pure functions. Pure functions process inputs and return values without detectable side-effects.
Given the same input they should always return the same output.

The pipes we saw earlier in this chapter were implemented with pure functions. The built-in DatePipe is a pure pipe with a pure function implementation.
 So is our ExponentialStrengthPipe. So is our FlyingHeroesPipe. A few steps back we reviewed the FlyingHeroesImpurePipe — an impure pipe with a pure function.

But a pure pipe must always be implemented with a pure function.
Failure to heed this warning will bring about many a console errors regarding expressions that have changed after they were checked.
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////DependencyInjection///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
/*
@Injectable() marks a class as available to an injector for instantiation. Generally speaking, an injector will report an error when trying to instantiate a class that is not marked as @Injectable().

As it happens, we could have omitted @Injectable() from our first version of HeroService because it had no injected parameters.
But we must have it now that our service has an injected dependency. We need it because Angular requires constructor parameter
metadata in order to inject a Logger.

We recommend adding @Injectable() to every service class, even those that don't have dependencies and, therefore, do not technically require it. Here's why:
Future proofing: No need to remember @Injectable() when we add a dependency later.
Consistency: All services follow the same rules, and we don't have to wonder why a decorator is missing.

We can add it if we really want to. It isn't necessary because the HeroesComponent is already marked with @Component, and this decorator class
(like @Directive and @Pipe, which we'll learn about later) is a subtype of InjectableMetadata. It is in fact InjectableMetadata decorators
that identify a class as a target for instantiation by an injector.

Injectors use a class's constructor metadata to determine dependent types as identified by the constructor's parameter types.
TypeScript generates such metadata for any class with a decorator, and any decorator will do. But of course, it is more
meaningful to mark a class using the appropriate InjectableMetadata decorator.

providers: [Logger] is shorthand for the provider object literal
[{ provide: Logger, useClass: Logger }]

Class Provider With Dependencies:
[ UserService, { provide: Logger, useClass: EvenBetterLogger }]


Suppose an old component depends upon an OldLogger class. OldLogger has the same interface as the NewLogger,
but for some reason we can't update the old component to use it.
When the old component logs a message with OldLogger, we want the singleton instance of NewLogger to handle it instead.
The dependency injector should inject that singleton instance when a component asks for either the new or the old logger.
The OldLogger should be an alias for NewLogger.
We certainly do not want two different NewLogger instances in our app.
Unfortunately, that's what we get if we try to alias OldLogger to NewLogger with useClass.

Aliased class providers
[ NewLogger,
  // Alias OldLogger w/ reference to NewLogger
  { provide: OldLogger, useExisting: NewLogger}]


Value providers
Sometimes it's easier to provide a ready-made object rather than ask the injector to create it from a class.
// An object in the shape of the logger service
let silentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: () => {}
};
[{ provide: Logger, useValue: silentLogger }]


Factory providers
Sometimes we need to create the dependent value dynamically, based on information we won't have until the last possible moment.
Maybe the information changes repeatedly in the course of the browser session.

the HeroService constructor takes a boolean flag to control display of secret heroes.
app/heroes/hero.service.ts (excerpt)

constructor(
  private logger: Logger,
  private isAuthorized: boolean) { }

getHeroes() {
  let auth = this.isAuthorized ? 'authorized ' : 'unauthorized';
  this.logger.log(`Getting heroes for ${auth} user.`);
  return HEROES.filter(hero => this.isAuthorized || !hero.isSecret);
 }

We can inject the Logger, but we can't inject the boolean isAuthorized. We'll have to take over the creation of new instances of
this HeroService with a factory provider.

A factory provider needs a factory function:
app/heroes/hero.service.provider.ts (excerpt)

let heroServiceFactory = (logger: Logger, userService: UserService) => {
  return new HeroService(logger, userService.user.isAuthorized);
};

Although the HeroService has no access to the UserService, our factory function does.
We inject both the Logger and the UserService into the factory provider and let the injector pass them along to the factory function:
The useFactory field tells Angular that the provider is a factory function whose implementation is the heroServiceFactory.
The deps property is an array of provider tokens. The Logger and UserService classes serve as tokens for their own class providers.
The injector resolves these tokens and injects the corresponding services into the matching factory function parameters.

let heroServiceProvider =
  { provide: HeroService,
    useFactory: heroServiceFactory,
    deps: [Logger, UserService]
  };

To use: providers: [heroServiceProvider],

*/
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////TEMPLATE SYNTAX/////////////////////////////
//////////////////////////////////////////////////////////////
/*
Almost all HTML syntax is valid template syntax. The <script> element is a notable exception;
it is forbidden, eliminating the risk of script injection attacks. (In practice, <script> is simply ignored.)

We use interpolation to weave calculated strings into the text between HTML element tags and within attribute assignments.
More generally, the material between the braces is a
template expression that Angular first evaluates and then converts to a string.
We put a template expression within the interpolation braces when we wrote {{1 + 1}}.
We’ll see template expressions again in the property binding section,
appearing in quotes to the right of the = symbol as in [property]="expression"

JavaScript expressions that have or promote side effects are prohibited, including:

assignments (=, +=, -=, ...)
new
chaining expressions with ; or ,
increment and decrement operators (++ and --)

Other notable differences from JavaScript syntax include:

no support for the bitwise operators | and &
new template expression operators, such as | and ?.

Perhaps more surprising, template expressions cannot refer to anything in the global namespace.
They can’t refer to window or document.
They can’t call console.log or Math.max.
They are restricted to referencing members of the expression context.
The expression context is typically the component instance, which is the source of binding values.
When we see title wrapped in double-curly braces, {{title}},
we know that title is a property of the data-bound component.
When we see isUnchanged in [disabled]="isUnchanged",
we know we are referring to that component's isUnchanged property.
The component itself is usually the expression context,
in which case the template expression usually references that component.
The expression context can include objects other than the component.
A template reference variable is one such alternative context object.

No visible side effects
A template expression should not change any application state other than the value of the target property.
This rule is essentiAl to Angular's "unidirectional data flow" policy.
We should never worry that reading a component value might change some other displayed value.
The view should be stable throughout a single rendering pass.

Quick execution
Angular executes template expressions more often than we think.
They can be called after every keypress or mouse move.
Expressions should finish quickly or the user experience may drag,
 especially on slower devices. Consider caching values
computed from other values when the computation is expensive.

Simplicity
Although it's possible to write quite complex template expressions, we really shouldn't.

Idempotence
An idempotent expression is ideal because it is free of side effects and improves Angular's change detection performance.
In Angular terms, an idempotent expression always returns exactly the same thing until one of its dependent values changes.
Dependent values should not change during a single turn of the event loop.

A template statement responds to an event raised by a binding target such as an element, component, or directive.
We’ll see template statements in the event binding section,
appearing in quotes to the right of the = symbol as in (event)="statement".
A template statement has a side effect.
It's how we update application state from user input.
There would be no point to responding to an event otherwise.

Like template expressions, template statements use a language that looks like JavaScript.
The template statement parser is different than the template expression parser and specifically
supports both basic assignment (=) and chaining expressions (with ; or ,).

However, certain JavaScript syntax is not allowed:
new
increment and decrement operators, ++ and --
operator assignment, such as += and -=
the bitwise operators | and &
the template expression operators
Template statements cannot refer to anything in the global namespace.
The statement context may include an object other than the component.
A template reference variable is one such alternative context object. We'll frequently see the reserved $event symbol in event binding statements,

<!-- Bind button disabled state to `isUnchanged` property -->
<button [disabled]="isUnchanged">Save</button>

Template binding works with properties and events, not attributes.

HTML attribute vs. DOM property
The distinction between an HTML attribute and a DOM property is crucial to understanding how Angular binding works.
Attributes are defined by HTML. Properties are defined by the DOM (Document Object Model).
A few HTML attributes have 1:1 mapping to properties. id is one example.
Some HTML attributes don't have corresponding properties. colspan is one example.
Some DOM properties don't have corresponding attributes. textContent is one example.
Many HTML attributes appear to map to properties ... but not in the way we might think!
Attributes initialize DOM properties and then they are done.
Property values can change; attribute values can't.
For example, when the browser renders <input type="text" value="Bob">,
it creates a corresponding DOM node with a value property initialized to "Bob".
When the user enters "Sally" into the input box, the DOM element value
property becomes "Sally".
But the HTML value attribute remains unchanged as we discover
if we ask the input element about that attribute: input.getAttribute('value') // returns "Bob"
The HTML attribute value specifies the initial value; the DOM value property is the current value.
The disabled attribute is another peculiar example.
A button's disabled property is false by default so the button is enabled.
When we add the disabled attribute, its presence alone initializes the button's
disabled property to true so the button is disabled.
Adding and removing thE disabled attribute disables and enables the button.
The value of the attribute is irrelevant,
which is why we cannot enable a button by writing <button disabled="false">Still Disabled</button>.
Setting the button's disabled property (say, with an Angular binding) disables or enables the button.
The value of the property matters.
The HTML attribute and the DOM property are not the same thing, even when they have the same name.


The target of a data binding is something in the DOM.
Depending on the binding type, the target can be an (element | component | directive) property,
an (element | component | directive) event, or (rarely) an attribute name. The following table summarizes:

///////////////////////////////////////////////////////////
Property Binding
We write a template property binding when we want to set a property of a view element to the value of a template expression.
<img [src] = "heroImageUrl">
<hero-detail [hero]="currentHero"></hero-detail>
<div [ngClass] = "{selected: isSelected}"></div>
Same as ngStyle the ngClass allows multiple ways to add and toggle our CSS.
We can bind these classes directly to our component properties to update them dynamically as needed.
We cannot use property binding to pull values out of the target element.
We can't bind to a property of the target element to read it. We can only set it.
The target name is always the name of a property, even when it appears to be the name of something else.
We see src and may think it’s the name of an attribute. No. It’s the name of an image element property.
Avoid side effects

We often have a choice between interpolation and property binding:
<p><img src="{{heroImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="heroImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{title}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="title"></span>" is the <i>property bound</i> title.</p>

Imagine the following malicious content.
evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
Fortunately, Angular data binding is on alert for dangerous HTML.
It sanitizes the values before displaying them.
It will not allow HTML with script tags to leak into the browser,
neither with interpolation nor property binding.
///////////////////////////////////////////////////////////////////////////////////////////////////
Attribute Binding
We must use attribute binding when there is no element property to bind.

Consider the ARIA, SVG, and table span attributes.
They are pure attributes. They do not correspond to element properties,
and they do not set element properties. There are no property targets to bind to.
We become painfully aware of this fact when we try to write something like this:

<tr><td colspan="{{1 + 1}}">Three-Four</td></tr>
We get this error:

Template parse errors:
Can't bind to 'colspan' since it isn't a known native property
We need attribute bindings to create and bind to such attributes.


Attribute binding syntax resembles property binding.
Instead of an element property between brackets, we start with the prefix attr,
followed by a dot (.) and the name of the attribute. We then set the attribute
value, using an expression that resolves to a string.

Here we bind [attr.colspan] to a calculated value:
<table border=1>
  <!--  expression calculates colspan=2 -->
  <tr><td [attr.colspan]="1 + 1">One-Two</td></tr>
 <tr><td>Five</td><td>Six</td></tr>
</table>

//////////////////////////////////////////////////////////////////////////////////////////////////
Class Binding
We can add and remove CSS class names from an element’s class attribute with a class binding.

Here's how we set the attribute without binding:
<!-- standard class attribute setting  -->
<div class="bad curly special">Bad curly special</div>

We can replace that with a binding to a string of the desired class names;
this is an all-or-nothing, replacement binding.
<!-- reset/override all class names with a binding  -->
<div class="bad curly special"
     [class]="badCurly">Bad curly</div>

Finally, we can bind to a specific class name. Angular adds the class when the
template expression evaluates to truthy. It removes the class when the expression is falsey.
<!-- toggle the "special" class on/off with a property -->
<div [class.special]="isSpecial">The class binding is special</div>
<!-- binding to `class.special` trumps the class attribute -->
<div class="special"
     [class.special]="!isSpecial">This one is not so special</div>
Prefer ngClass doe.
////////////////////////////////////////////////////////////////////////////////
Style binding
<button [style.color] = "isSpecial ? 'red': 'green'">Red</button>
<button [style.background-color]="canSave ? 'cyan': 'grey'" >Save</button>
<button [style.font-size.em]="isSpecial ? 3 : 1" >Big</button>
<button [style.font-size.%]="!isSpecial ? 150 : 50" >Small</button>
Prefer ngStyle doe

////////////////////////////////////////////////////////////////////////////////
Event Binding
In an event binding, Angular sets up an event handler for the target event.
When the event is raised, the handler executes the template statement.
The binding conveys information about the event, including data values, through an event object named $event.
The shape of the event object is determined by the target event itself.
If the target event is a native DOM element event, the $event is a DOM event object,
with properties such as target and target.value.
Consider this example:

Directives typically raise custom events with an Angular EventEmitter.
A directive creates an EventEmitter and exposes it as a property.
The directive calls EventEmitter.emit(payload) to fire an event,
passing in a message payload that can be anything.
Parent directives listen for the event by binding to this
property and accessing the payload through the $event object.
Template statements have side effects
////////////////////////////////////////////////////////////////////////////////
Built in Directives:
////////////////////////////////////////////////////////////////////////
NgClass

setClasses() {
  let classes =  {
    saveable: this.canSave,      // true
    modified: !this.isUnchanged, // false
    special: this.isSpecial,     // true
  };
  return classes;
}

<div [ngClass]="setClasses()">This div is saveable and special</div>
//////////////////////////////////////////////////////////////////////
NgStyle

setStyles() {
  let styles = {
    // CSS property names
    'font-style':  this.canSave      ? 'italic' : 'normal',  // italic
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',  // normal
    'font-size':   this.isSpecial    ? '24px'   : '8px',     // 24px
  };
  return styles;
}

<div [ngStyle]="setStyles()">
  This div is italic, normal weight, and extra large (24px).
</div>
/////////////////////////////////////////////////////////////////////////
NgIf
When NgIf is false, Angular physically removes the element subtree from the DOM.
It destroys components in the subtree, along with their state, potentially
freeing up substantial resources and resulting in better performance for the user.

<div *ngIf="currentHero">Hello, {{currentHero.firstName}}</div>
//////////////////////////////////////////////////////////////////////////
NgSwitch
If the span’s match value equals the switch value, Angular adds the <span> to the DOM.
If none of the spans is a match, Angular adds the default span to the DOM. Angular removes and destroys all other spans.

<span [ngSwitch]="toeChoice">
  <span *ngSwitchWhen="'Eenie'">Eenie</span>
  <span *ngSwitchWhen="'Meanie'">Meanie</span>
  <span *ngSwitchWhen="'Miney'">Miney</span>
  <span *ngSwitchWhen="'Moe'">Moe</span>
  <span *ngSwitchDefault>other</span>
</span>
///////////////////////////////////////////////////////////////////////////////////
ngFor
<div *ngFor="let hero of heroes; let i = index">{{hero.fullName}}</div>
The let keyword before hero creates a template input variable called hero.
A template input variable is not the same as a template reference variable!

NgForTrackBy
The ngFor directive has the potential to perform poorly,
especially with large lists.
For example, we could refresh the list of heroes by re-querying the server.
The refreshed list probably contains most, if not all, of the previously displayed heroes.
We know this because the id of each hero hasn't changed.
But Angular sees only a fresh list of new object references.
Angular can avoid this churn if we give it a tracking function
that tells it what we know: that two objects with the same hero.id
 are the same hero. Here is such a function:

trackByHeroes(index: number, hero: Hero) { return hero.id; }

Now set the NgForTrackBy directive to that tracking function.
Angular offers a variety of equivalent syntax choices including these two:

<div *ngFor="let hero of heroes; trackBy:trackByHeroes">({{hero.id}}) {{hero.fullName}}</div>
<div *ngFor="let hero of heroes" *ngForTrackBy="trackByHeroes">({{hero.id}}) {{hero.fullName}}</div>

The tracking function doesn't eliminate all DOM changes.
Angular may have to update the DOM element if the same-hero properties have changed.
 But if the properties haven't changed — and most of the time they will not have changed —
Angular can leave those DOM elements alone. The list UI will be smoother and more responsive.
///////////////////////////////////////////////////////////////////////////////////////////////////
Template Reference Variables
The hash (#) prefix to "phone" means that we're defining a phone variable.
<!-- phone refers to the input element; pass its `value` to an event handler -->
<input #phone placeholder="phone number">
<button (click)="callPhone(phone.value)">Call</button>


<form (ngSubmit)="onSubmit(theForm)" #theForm="ngForm">
  <div class="form-group">
    <label for="name">Name</label>
    <input class="form-control" required ngControl="firstName"
      [(ngModel)]="currentHero.firstName">
  </div>
  <button type="submit" [disabled]="!theForm.form.valid">Submit</button>
</form>

What is the value of theForm?
It would be the HTMLFormElement if Angular hadn't taken it over.
It's actually ngForm, a reference to the Angular built-in NgForm
directive that wraps the native HTMLFormElement and endows it with additional
superpowers such as the ability to track the validity of user input.
////////////////////////////////////////////////////////////////////////////////////////////////////////
Inputs and Outputs
This section concentrates on binding to targets, which are directive properties on the left side of the binding declaration.
These directive properties must be declared as inputs or outputs.
Remember: All components are directives.

We're drawing a sharp distinction between a data binding target and a data binding source.
The target of a binding is to the left of the =. The source is on the right of the =.
The target of a binding is the property or event inside the binding punctuation: [], () or [()].
The source is either inside quotes (" ") or within an interpolation ({{}}).
Every member of a source directive is automatically available for binding.
We don't have to do anything special to access a directive member in a template expression or statement.
We have limited access to members of a target directive.
We can only bind to properties that are explicitly identified as inputs and outputs.

Target properties must be explicitly marked as inputs or outputs.
When we peek inside HeroDetailComponent, we see that these properties are
marked with decorators as input and output properties.

@Input()  hero: Hero;
@Output() deleteRequest = new EventEmitter<Hero>();

Alternatively, we can identify members in the inputs and outputs arrays of the directive metadata, as in this example:
@Component({
  inputs: ['hero'],
  outputs: ['deleteRequest'],
})

We can specify an input/output property either with a decorator or in a metadata array. Don't do both!

Aliasing the NAME:
<div (myClick)="clickMessage=$event">click with myClick</div>
@Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ...

We can also alias property names in the inputs and outputs arrays. We write a colon-delimited (:)
string with the directive property name on the left and the public alias on the right:

@Directive({
  outputs: ['clicks:myClick']  // propertyName:alias
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pipes - Already Done

The safe navigation operator ( ?. ) and null property paths
The Angular safe navigation operator (?.) is a fluent and convenient way to guard against null
and undefined values in property paths. Here it is, protecting against a view render failure if
the currentHero is null.

The current hero's name is {{currentHero?.firstName}} => May throw a null reference error if currentHero is null
Worse, the entire view disappears.
The Angular safe navigation operator (?.) is a more fluent and convenient
way to guard against nulls in property paths. The expression bails out
when it hits the first null value. The display is blank, but the app keeps rolling without errors.
It works perfectly with long property paths such as a?.b?.c?.d.
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Structural Directives

There are three kinds of Angular directives:
Components
Attribute directives
Structural directives

The Component is really a directive with a template.
It's the most common of the three directives and we write lots of them as we build our application.

The Attribute directive changes the appearance or behavior of an element.
The built-in NgStyle directive, for example, can change several element
styles at the same time. We can use it to render text bold, italic, and
lime green by binding to a component property that requests such a sickening result.

A Structural directive changes the DOM layout by adding and removing DOM elements.
We've seen three of the built-in structural directives in other chapters: ngIf, ngSwitch and ngFor.

<!-- Examples (A) and (B) are the same -->
<!-- (A) *ngIf paragraph -->
<p *ngIf="condition">
  Our heroes are true!
</p>

<!-- (B) [ngIf] with template -->
<template [ngIf]="condition">
  <p>
    Our heroes are true!
  </p>
</template>

It's worth knowing that Angular expands style (A) into style (B).
It moves the paragraph and its contents inside a <template> tag.
It moves the directive up to the <template> tag where it becomes a property binding,
surrounded in square brackets. The boolean value of the host component's condition
property determines whether the templated content is displayed or not.

<!-- Examples (A) and (B) are the same -->

<!-- (A) *ngFor div -->
<div *ngFor="let hero of heroes">{{ hero }}</div>

<!-- (B) ngFor with template -->
<template ngFor let-hero [ngForOf]="heroes">
  <div>{{ hero }}</div>
</template>
<------------------------------------->

//Make a structural Directive
/*
Creating a directive is similar to creating a component.
import the Directive decorator
add a CSS attribute selector (in brackets) that identifies our directive.
specify the name of the public input property for binding (typically the name of the directive itself).
apply the decorator to our implementation class.
*/
//This directive display dom if it is false
var UnlessDirective = (function () {
    /*
    We'll need access to the template and something that can render its contents.
    We access the template with a TemplateRef.
    The renderer is a ViewContainerRef.
     We inject both into our constructor as private variables.
    */
    function UnlessDirective(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    Object.defineProperty(UnlessDirective.prototype, "myUnless", {
        /*
        The consumer of our directive will bind a boolean value to our directive's myUnless input property.
        The directive adds or removes the template based on that value.
        Let's add the myUnless property now as a setter-only property.
        */
        set: function (condition) {
            if (!condition) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
            else {
                this.viewContainer.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], UnlessDirective.prototype, "myUnless", null);
    UnlessDirective = __decorate([
        core_1.Directive({ selector: '[myUnless]' }), 
        __metadata('design:paramtypes', [core_3.TemplateRef, core_3.ViewContainerRef])
    ], UnlessDirective);
    return UnlessDirective;
}());
exports.UnlessDirective = UnlessDirective;
var unless = (function () {
    function unless() {
        this.condition = true;
    }
    unless = __decorate([
        core_1.Component({
            selector: 'unless',
            directives: [UnlessDirective],
            template: "\n<p *myUnless=\"condition\">\n  condition is false and myUnless is true.\n</p>\n\n<p *myUnless=\"!condition\">\n  condition is true and myUnless is false.\n</p> \n"
        }), 
        __metadata('design:paramtypes', [])
    ], unless);
    return unless;
}());
exports.unless = unless;
//bootstrap(unless);
///////////////////////////////////////////////////////////////////////////////////////////////////////
////Component Lifecycle////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Angular offers component lifecycle hooks that gives us visibility into key moments of when angular creates,
renders, checks when its data-bound properties changes, and destroys its compoents.
Directive and component instances have a lifecycle as Angular creates, updates, and destroys them.

Developers can tap into key moments in that lifecycle by implementing one or more of the Lifecycle Hook interfaces in the Angular core library.

Each interface has a single hook method whose name is the interface name prefixed with ng. For example,
the OnInit interface has a hook method named ngOnInit.

Angular only calls a directive/component hook method if it is defined.
///////////////////////////////////////////////
Directives and Components:
ngOnInit
Initialize the directive/component after Angular initializes the data-bound input properties.

ngOnChanges
Respond after Angular sets a data-bound input property. The method receives a changes object of current and previous values.

ngDoCheck
Detect and act upon changes that Angular can or won't detect on its own. Called every change detection run.

ngOnDestroy
Cleanup just before Angular destroys the directive/component. Unsubscribe observables and detach event handlers to avoid memory leaks.
///////////////////////////////////////////////////////
Components only

Hook	Purpose
ngAfterContentInit
After Angular projects external content into its view.

ngAfterContentChecked
After Angular checks the bindings of the external content that it projected into its view.

ngAfterViewInit
After Angular creates the component's view(s).

ngAfterViewChecked
After Angular checks the bindings of the component's view(s).
//////////////////////////////////////////////////////////////

After Angular creates a component/directive by new-ing its constructor, it calls the lifecycle hook methods
in the following sequence at specific moments:

ngOnChanges
before ngOnInit and when a data-bound input property value changes.

ngOnInit
after the first ngOnChanges.

ngDoCheck
during every Angular change detection cycle.

ngAfterContentInit
after projecting content into the component.

ngAfterContentChecked
after every check of projected component content.

ngAfterViewInit
after initializing the component's views and child views.

ngAfterViewChecked
after every check of the component's views and child views.

ngOnDestroy
just before Angular destroys the directive/component.
*/
//Use all hooks at once:
var nextId = 1;
var LoggerService = (function () {
    function LoggerService() {
        this.logs = [];
        this.prevMsg = '';
        this.prevMsgCount = 1;
    }
    LoggerService.prototype.log = function (msg) {
        if (msg === this.prevMsg) {
            // Repeat message; update last log entry with count.
            this.logs[this.logs.length - 1] = msg + (" (" + (this.prevMsgCount += 1) + "x)");
        }
        else {
            // New message; log it.
            this.prevMsg = msg;
            this.prevMsgCount = 1;
            this.logs.push(msg);
        }
    };
    LoggerService.prototype.clear = function () { this.logs.length = 0; };
    // schedules a view refresh to ensure display catches up
    /*
    The LoggerService.tick methods, which are implemented by a call to setTimeout,
    postpone the update one turn of the of the browser's JavaScript cycle ... and that's long enough.
    */
    LoggerService.prototype.tick = function () { this.tick_then(function () { }); };
    LoggerService.prototype.tick_then = function (fn) { setTimeout(fn, 0); };
    LoggerService = __decorate([
        core_2.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
var PeekABoo = (function () {
    function PeekABoo(logger) {
        this.logger = logger;
    }
    // implement OnInit's `ngOnInit` method
    PeekABoo.prototype.ngOnInit = function () { this.logIt("OnInit"); };
    PeekABoo.prototype.logIt = function (msg) {
        this.logger.log("#" + nextId++ + " " + msg);
    };
    return PeekABoo;
}());
exports.PeekABoo = PeekABoo;
var PeekABooComponent = (function (_super) {
    __extends(PeekABooComponent, _super);
    function PeekABooComponent(logger) {
        _super.call(this, logger);
        this.verb = 'initialized';
        var is = this.name ? 'is' : 'is not';
        this.logIt("name " + is + " known at construction");
    }
    // only called for/if there is an @input variable set by parent.
    PeekABooComponent.prototype.ngOnChanges = function (changes) {
        var changesMsgs = [];
        for (var propName in changes) {
            if (propName === 'name') {
                var name_1 = changes['name'].currentValue;
                changesMsgs.push("name " + this.verb + " to \"" + name_1 + "\"");
            }
            else {
                changesMsgs.push(propName + ' ' + this.verb);
            }
        }
        this.logIt("OnChanges: " + changesMsgs.join('; '));
        this.verb = 'changed'; // next time it will be a change
    };
    // Beware! Called frequently!
    // Called in every change detection cycle anywhere on the page
    PeekABooComponent.prototype.ngDoCheck = function () { this.logIt("DoCheck"); };
    PeekABooComponent.prototype.ngAfterContentInit = function () { this.logIt("AfterContentInit"); };
    // Beware! Called frequently!
    // Called in every change detection cycle anywhere on the page
    PeekABooComponent.prototype.ngAfterContentChecked = function () { this.logIt("AfterContentChecked"); };
    PeekABooComponent.prototype.ngAfterViewInit = function () { this.logIt("AfterViewInit"); };
    // Beware! Called frequently!
    // Called in every change detection cycle anywhere on the page
    PeekABooComponent.prototype.ngAfterViewChecked = function () { this.logIt("AfterViewChecked"); };
    PeekABooComponent.prototype.ngOnDestroy = function () { this.logIt("OnDestroy"); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PeekABooComponent.prototype, "name", void 0);
    PeekABooComponent = __decorate([
        core_1.Component({
            selector: 'peek-a-boo',
            template: '<p>Now you see my hero, {{name}}</p>',
            styles: ['p {background: LightYellow; padding: 8px}'],
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], PeekABooComponent);
    return PeekABooComponent;
}(PeekABoo));
exports.PeekABooComponent = PeekABooComponent;
var PeekABooParentComponent = (function () {
    function PeekABooParentComponent(logger) {
        this.hasChild = false;
        this.heroName = 'Windstorm';
        this.logger = logger;
        this.hookLog = logger.logs;
    }
    PeekABooParentComponent.prototype.toggleChild = function () {
        this.hasChild = !this.hasChild;
        if (this.hasChild) {
            this.heroName = 'Windstorm';
            this.logger.clear(); // clear log on create
        }
        this.logger.tick();
    };
    PeekABooParentComponent.prototype.updateHero = function () {
        this.heroName += '!';
        this.logger.tick();
    };
    PeekABooParentComponent = __decorate([
        core_1.Component({
            selector: 'peek-a-boo-parent',
            template: "\n  <div class=\"parent\">\n    <h2>Peek-A-Boo</h2>\n\n    <button (click)=\"toggleChild()\">\n      {{hasChild ? 'Destroy' : 'Create'}} PeekABooComponent\n    </button>\n    <button (click)=\"updateHero()\" [hidden]=\"!hasChild\">Update Hero</button>\n\n    <peek-a-boo *ngIf=\"hasChild\" [name]=\"heroName\">\n    </peek-a-boo>\n\n    <h4>-- Lifecycle Hook Log --</h4>\n    <div *ngFor=\"let msg of hookLog\">{{msg}}</div>\n  </div>\n  ",
            styles: ['.parent {background: moccasin}'],
            directives: [PeekABooComponent],
            providers: [LoggerService]
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], PeekABooParentComponent);
    return PeekABooParentComponent;
}());
exports.PeekABooParentComponent = PeekABooParentComponent;
//bootstrap(PeekABooParentComponent);
/*
Other Angular sub-systems may have their own lifecycle hooks apart from the component hooks we've listed.
The router, for instance, also has it's own router lifecycle hooks that allow us to tap into specific moments
in route navigation. A parallel can be drawn between ngOnInit and routerOnActivate. Both are prefixed so as
to avoid collision, and both run right when a component is 'booting' up.

Angular calls hook methods for directives as well as components.
A spy directive can gives us insight into a DOM object that we cannot change directly.
Obviously we can't change the implementation of a native div. We can't modify a third party
component either. But we can watch both with a directive.

We can apply the spy to any native or component element and it'll be initialized and destroyed at the same time as that element.
Here we attach it to the repeated hero <div>

<div *ngFor="let hero of heroes" mySpy class="heroes">
  {{hero}}
</div>
Each spy's birth and death marks the birth and death of the attached hero <div> with an entry in the Hook Log as we see here:

We turn to ngOnInit for two main reasons:
To perform complex initializations shortly after construction
To set up the component after Angular sets the input properties
An ngOnInit often fetches data for the component as shown in the Tutorial and HTTP chapters.
When a component must start working soon after creation, we can count on Angular to call the ngOnInit method to jumpstart it.
That's where the heavy initialization logic belongs.Remember also that a directive's data-bound input properties are not set until after construction.
That's a problem if we need to initialize the directive based on those properties. They'll have been set when our ngOninit runs.
Our first opportunity to access those properties is the ngOnChanges method which Angular calls before ngOnit. But Angular calls ngOnChanges many times after that.
It only calls ngOnit once.

Put cleanup logic in ngOnDestroy, the logic that must run before Angular destroys the directive.
This is the time to notify another part of the application that this component is going away.
This is the place to free resources that won't be garbage collected automatically. Unsubscribe from observables and DOM events.
deskStop interval timers. Unregister all callbacks that this directive registered with global or application services. We risk memory leaks if we neglect to do so.
*/
//Our Sneak Spy Directive
// Spy on any element to which it is applied.
// Usage: <div mySpy>...</div>
var SpyDirective = (function () {
    function SpyDirective(logger) {
        this.logger = logger;
    }
    SpyDirective.prototype.ngOnInit = function () { this.logIt("onInit"); };
    SpyDirective.prototype.ngOnDestroy = function () { this.logIt("onDestroy"); };
    SpyDirective.prototype.logIt = function (msg) {
        this.logger.log("Spy #" + nextId++ + " " + msg);
    };
    SpyDirective = __decorate([
        core_1.Directive({ selector: '[mySpy]' }), 
        __metadata('design:paramtypes', [LoggerService])
    ], SpyDirective);
    return SpyDirective;
}());
exports.SpyDirective = SpyDirective;
var SpyParentComponent = (function () {
    function SpyParentComponent(logger) {
        this.logger = logger;
        this.newName = 'Herbie';
        this.heroes = ['Windstorm', 'Magneta'];
        this.spyLog = logger.logs;
    }
    SpyParentComponent.prototype.addHero = function () {
        if (this.newName.trim()) {
            this.heroes.push(this.newName.trim());
            this.newName = '';
            this.logger.tick();
        }
    };
    SpyParentComponent.prototype.removeHero = function (hero) {
        this.heroes.splice(this.heroes.indexOf(hero), 1);
        this.logger.tick();
    };
    SpyParentComponent.prototype.reset = function () {
        this.logger.log('-- reset --');
        this.heroes.length = 0;
        this.logger.tick();
    };
    SpyParentComponent = __decorate([
        core_1.Component({
            selector: 'spy-parent',
            template: "\n<div class=\"parent\">\n  <h2>Spy Directive</h2>\n\n  <input [(ngModel)]=\"newName\" (keyup.enter)=\"addHero()\">\n  <button (click)=\"addHero()\">Add Hero</button>\n  <button (click)=\"reset()\">Reset Heroes</button>\n\n  <p></p>\n  <div *ngFor=\"let hero of heroes\" mySpy class=\"heroes\">\n    {{hero}}\n  </div>\n  <h4>-- Spy Lifecycle Hook Log --</h4>\n  <div *ngFor=\"let msg of spyLog\">{{msg}}</div>\n</div>\n",
            styles: [
                '.parent {background: khaki;}',
                '.heroes {background: LightYellow; padding: 0 8px}'
            ],
            directives: [SpyDirective],
            providers: [LoggerService]
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], SpyParentComponent);
    return SpyParentComponent;
}());
exports.SpyParentComponent = SpyParentComponent;
//bootstrap(SpyParentComponent);
/*
//////////////
OnChanges
Angular calls its ngOnChanges method whenever it detects changes to input properties of the component (or directive).

ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
  for (let propName in changes) {
    let chng = changes[propName];
    let cur  = JSON.stringify(chng.currentValue);
    let prev = JSON.stringify(chng.previousValue);
    this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
  }
}
The ngOnChanges method takes an object that maps each changed property name to a SimpleChange object with the current and previous property values.
Angular only calls the hook when the value of the input property changes. The value of the hero property is the reference to the hero object.
/////////////////
ngDoCheck
Angular doesn't care that the hero's own name property changed. The hero object reference didn't change so, from Angular's perspective, there is no change to report!

We can use the DoCheck hook to detect and act upon changes that Angular doesn't catch on its own.

ngDoCheck() {

  if (this.hero.name !== this.oldHeroName) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Hero name changed to "${this.hero.name}" from "${this.oldHeroName}"`);
    this.oldHeroName = this.hero.name;
  }

  if (this.power !== this.oldPower) {
    this.changeDetected = true;
    this.changeLog.push(`DoCheck: Power changed to "${this.power}" from "${this.oldPower}"`);
    this.oldPower = this.power;
  }

  if (this.changeDetected) {
      this.noChangeCount = 0;
  } else {
      // log that hook was called when there was no relevant change.
      let count = this.noChangeCount += 1;
      let noChangeMsg = `DoCheck called ${count}x when no change to hero or power`;
      if (count === 1) {
        // add new "no change" message
        this.changeLog.push(noChangeMsg);
      } else {
        // update last "no change" message
        this.changeLog[this.changeLog.length - 1] = noChangeMsg;
      }
  }

  this.changeDetected = false;
}
We manually check everything that we care about, capturing and comparing against previous values.
/////////////////////
AfterViewwInit and AfterViewChecked

Here's a child view that displays a hero's name in an input box:
*/
var ChildViewComponent = (function () {
    function ChildViewComponent() {
        this.hero = 'Magneta';
    }
    ChildViewComponent = __decorate([
        core_1.Component({
            selector: 'my-child',
            template: '<input [(ngModel)]="hero">'
        }), 
        __metadata('design:paramtypes', [])
    ], ChildViewComponent);
    return ChildViewComponent;
}());
exports.ChildViewComponent = ChildViewComponent;
/*
The following hooks take action based on changing values within the child view which we can only reach by querying for
the child view via the property decorated with @ViewChild.
*/
var AfterViewComponent = (function () {
    function AfterViewComponent(logger) {
        this.logger = logger;
        this.prevHero = '';
        this.comment = '';
        this.logIt('AfterView constructor');
    }
    AfterViewComponent.prototype.ngAfterViewInit = function () {
        // viewChild is set after the view has been initialized
        this.logIt('AfterViewInit');
        this.doSomething();
    };
    AfterViewComponent.prototype.ngAfterViewChecked = function () {
        // viewChild is updated after the view has been checked
        if (this.prevHero === this.viewChild.hero) {
            this.logIt('AfterViewChecked (no change)');
        }
        else {
            this.prevHero = this.viewChild.hero;
            this.logIt('AfterViewChecked');
            this.doSomething();
        }
    };
    // This surrogate for real business logic sets the `comment`
    /*
    Why does the doSomething method wait a tick before updating comment?
    Because we must adhere to Angular's unidirectional data flow rule which says that we may not update the view after it has been composed.
    Both hooks fire after the component's view has been composed.
    Angular throws an error if we update component's data-bound comment property immediately
    Notice that Angular frequently calls AfterViewChecked, often when there are no changes of interest. Write lean hook methods to avoid performance problems.
    */
    AfterViewComponent.prototype.doSomething = function () {
        var _this = this;
        var c = this.viewChild.hero.length > 10 ? "That's a long name" : '';
        if (c !== this.comment) {
            // Wait a tick because the component's view has already been checked
            this.logger.tick_then(function () { return _this.comment = c; });
        }
    };
    AfterViewComponent.prototype.logIt = function (method) {
        var child = this.viewChild;
        var message = method + ": " + (child ? child.hero : 'no') + " child view";
        this.logger.log(message);
    };
    __decorate([
        core_3.ViewChild(ChildViewComponent), 
        __metadata('design:type', ChildViewComponent)
    ], AfterViewComponent.prototype, "viewChild", void 0);
    AfterViewComponent = __decorate([
        core_1.Component({
            selector: 'after-view',
            template: "\n    <div>-- child view begins --</div>\n      <my-child></my-child>\n    <div>-- child view ends --</div>"
                + "\n    <p *ngIf=\"comment\" class=\"comment\">\n      {{comment}}\n    </p>\n  ",
            directives: [ChildViewComponent]
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], AfterViewComponent);
    return AfterViewComponent;
}());
exports.AfterViewComponent = AfterViewComponent;
//////////////
var AfterViewParentComponent = (function () {
    function AfterViewParentComponent(logger) {
        this.logger = logger;
        this.show = true;
        this.logs = logger.logs;
    }
    AfterViewParentComponent.prototype.reset = function () {
        var _this = this;
        this.logs.length = 0;
        // quickly remove and reload AfterViewComponent which recreates it
        this.show = false;
        this.logger.tick_then(function () { return _this.show = true; });
    };
    AfterViewParentComponent = __decorate([
        core_1.Component({
            selector: 'after-view-parent',
            template: "\n  <div class=\"parent\">\n    <h2>AfterView</h2>\n\n    <after-view  *ngIf=\"show\"></after-view>\n\n    <h4>-- AfterView Logs --</h4>\n    <p><button (click)=\"reset()\">Reset</button></p>\n    <div *ngFor=\"let msg of logs\">{{msg}}</div>\n  </div>\n  ",
            styles: ['.parent {background: burlywood}'],
            providers: [LoggerService],
            directives: [AfterViewComponent]
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], AfterViewParentComponent);
    return AfterViewParentComponent;
}());
exports.AfterViewParentComponent = AfterViewParentComponent;
//bootstrap(AfterViewParentComponent);
//AfterContent Lifecylcle hook/////////////////////////////
/*
The AfterContent sample explores the AfterContentInit and AfterContentChecked hooks that Angular calls after Angular projects external content into the component.
CONTENT PROJECTION IS THIS:
Content projection is a way to import HTML content from outside the component and insert that content into the component's template in a designated spot.

<after-content>
   <my-child></my-child>
 </after-content>`

Notice that the <my-child> tag is tucked between the <after-content> tags. We never put content between a component's element tags
unless we intend to project that content into the component.The <ng-content> tag is a placeholder for the external content.
They tell Angular where to insert that content. In this case, the projected content is the <my-child> from the parent.

template: `
  <div>-- projected content begins --</div>
    <ng-content></ng-content>
  <div>-- projected content ends --</div>`

ViewChildren VS ContentChildren,
AfterContent hooks are similar to the AfterView hooks. The key difference is the kind of child component that we're looking for.
The AfterView hooks concern ViewChildren, the child components whose element tags appear within the component's template.
The AfterContent hooks concern ContentChildren, the child components that Angular projected into the component.
The following AfterContent hooks take action based on changing values in a content child which we can only reach by querying for
it via the property decorated with @ContentChild.
*/
//////////////////
var ChildComponent = (function () {
    function ChildComponent() {
        this.hero = 'Magneta';
    }
    ChildComponent = __decorate([
        core_1.Component({
            selector: 'my-child',
            template: '<input [(ngModel)]="hero">'
        }), 
        __metadata('design:paramtypes', [])
    ], ChildComponent);
    return ChildComponent;
}());
exports.ChildComponent = ChildComponent;
//////////////////////
var AfterContentComponent = (function () {
    function AfterContentComponent(logger) {
        this.logger = logger;
        this.prevHero = '';
        this.comment = '';
        this.logIt('AfterContent constructor');
    }
    AfterContentComponent.prototype.ngAfterContentInit = function () {
        // contentChild is set after the content has been initialized
        this.logIt('AfterContentInit');
        this.doSomething();
    };
    /*
    This component's doSomething method update's the component's data-bound comment property immediately. There's no need to wait.
    */
    AfterContentComponent.prototype.ngAfterContentChecked = function () {
        // contentChild is updated after the content has been checked
        if (this.prevHero === this.contentChild.hero) {
            this.logIt('AfterContentChecked (no change)');
        }
        else {
            this.prevHero = this.contentChild.hero;
            this.logIt('AfterContentChecked');
            this.doSomething();
        }
    };
    // This surrogate for real business logic sets the `comment`
    AfterContentComponent.prototype.doSomething = function () {
        this.comment = this.contentChild.hero.length > 10 ? "That's a long name" : '';
    };
    AfterContentComponent.prototype.logIt = function (method) {
        var child = this.contentChild;
        var message = method + ": " + (child ? child.hero : 'no') + " child content";
        this.logger.log(message);
    };
    __decorate([
        core_3.ContentChild(ChildComponent), 
        __metadata('design:type', ChildComponent)
    ], AfterContentComponent.prototype, "contentChild", void 0);
    AfterContentComponent = __decorate([
        core_1.Component({
            selector: 'after-content',
            template: "\n    <div>-- projected content begins --</div>\n      <ng-content></ng-content>\n    <div>-- projected content ends --</div>"
                + "\n    <p *ngIf=\"comment\" class=\"comment\">\n      {{comment}}\n    </p>\n  "
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], AfterContentComponent);
    return AfterContentComponent;
}());
exports.AfterContentComponent = AfterContentComponent;
//////////////
var AfterContentParentComponent = (function () {
    function AfterContentParentComponent(logger) {
        this.logger = logger;
        this.show = true;
        this.logs = logger.logs;
    }
    AfterContentParentComponent.prototype.reset = function () {
        var _this = this;
        this.logs.length = 0;
        // quickly remove and reload AfterContentComponent which recreates it
        this.show = false;
        this.logger.tick_then(function () { return _this.show = true; });
    };
    AfterContentParentComponent = __decorate([
        core_1.Component({
            selector: 'after-content-parent',
            template: "\n  <div class=\"parent\">\n    <h2>AfterContent</h2>\n\n    <div *ngIf=\"show\">" +
                "<after-content>\n        <my-child></my-child>\n      </after-content>"
                + "</div>\n\n    <h4>-- AfterContent Logs --</h4>\n    <p><button (click)=\"reset()\">Reset</button></p>\n    <div *ngFor=\"let msg of logs\">{{msg}}</div>\n  </div>\n  ",
            styles: ['.parent {background: burlywood}'],
            providers: [LoggerService],
            directives: [AfterContentComponent, ChildComponent]
        }), 
        __metadata('design:paramtypes', [LoggerService])
    ], AfterContentParentComponent);
    return AfterContentParentComponent;
}());
exports.AfterContentParentComponent = AfterContentParentComponent;
//bootstrap(AfterContentParentComponent);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////ATTRIBUTE DIRECTIVES TUTORIAL/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
A Component is really a directive with a template. It's the most common of the three directives and we tend to write lots of them as we build applications.
Structural directives can change the DOM layout by adding and removing DOM elements. NgFor and NgIf are two familiar examples.
An Attribute directive can change the appearance or behavior of an element. The built-in NgStyle directive, for example, can change several element styles at the same time.

We are going to write our own attribute directive to set an element's background color when the user hovers over that element.

An attribute directive minimally requires building a controller class annotated with @Directive, which specifies the selector identifying the attribute associated with the directive.
The controller class implements the desired directive behavior.

We need the Directive symbol for the @Directive decorator. We need the ElementRef to inject into the directive's constructor so we can access the DOM element.
We don't need Input immediately but we will need it later in the chapter.@Directive requires a CSS selector to identify the HTML in the template that is associated with our directive.
The CSS selector for an attribute is the attribute name in square brackets. Our directive's selector is [myHighlight]. Angular
will locate all elements in the template that have an attribute named myHighlight.
Angular creates a new instance of the directive's controller class for each matching element, injecting an Angular ElementRef into the constructor.
ElementRef is a service that grants us direct access to the DOM element through its nativeElement property. That's all we need to set the element's background color using the browser DOM API

We are not satisfied to simply set an element color. Our directive should set the color in response to a user action.
Specifically, we want to set the color when the user hovers over an element.

We'll need to

detect when the user hovers into and out of the element,
respond to those actions by setting and clearing the highlight color, respectively.
We apply the @HostListener decorator to methods which are called when an event is raised.
@HostListener('mouseenter') onMouseEnter() {
...
}

@HostListener('mouseleave') onMouseLeave() {
...
}

The @HostListener decorator refers to the DOM element that hosts our attribute directive, the <p> in our case.
We could have attached event listeners by manipulating the host DOM element directly,
but there are at least three problems with such an approach:
We have to write the listeners correctly.
We must detach our listener when the directive is destroyed to avoid memory leaks.
We'd be talking to DOM API directly which, we learned, is something to avoid.
Let's roll with the @HostListener decorator.
*/
var ClickOutsideDirective = (function () {
    //Activates when you click outside
    function ClickOutsideDirective(_elementRef) {
        this._elementRef = _elementRef;
        /*
        We want to use something like (clickOutside)="close()" on the target element.
        By choosing the exact same name for both directive and event binding, we achieve this
        very compact syntax. As a result, we will use the exact same name of the selector also
        for the property holding the EventEmitter instance:
        */
        this.clickOutside = new core_1.EventEmitter();
    }
    /*
    We now have an event binding which can be invoked. Now let’s close the cycle by implementing the core of this directive.
The HostListener annotation of Angular 2 allows us to listen for certain events on the host, i.e. the DOM element.
    By using the document: notation, you can also listen for events on document level, which is exactly what we want to do here:
     Capture all clicks on any element of the document and check if it is outside of our own element.
In addition, you can optionally define which values should be passed to the decorated method. The event parameter is a
    MouseEvent, which holds the target element in the target property. As we are only interested in this element, let’s
    simply inject this element as a parameter:

    */
    ClickOutsideDirective.prototype.onClick = function (targetElement) {
        var clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ClickOutsideDirective.prototype, "clickOutside", void 0);
    __decorate([
        core_1.HostListener('document:click', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], ClickOutsideDirective.prototype, "onClick", null);
    ClickOutsideDirective = __decorate([
        core_1.Directive({
            selector: '[clickOutside]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ClickOutsideDirective);
    return ClickOutsideDirective;
}());
exports.ClickOutsideDirective = ClickOutsideDirective;
var HighlightDirective = (function () {
    function HighlightDirective(el) {
        this.el = el.nativeElement;
    }
    HighlightDirective.prototype.onMouseEnter = function () {
        this.highlight('yellow');
    };
    HighlightDirective.prototype.onMouseLeave = function () {
        this.highlight(null);
    };
    HighlightDirective.prototype.highlight = function (color) {
        this.el.style.backgroundColor = color;
    };
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
var AttributeDirectivesAreCool = (function () {
    function AttributeDirectivesAreCool() {
    }
    AttributeDirectivesAreCool = __decorate([
        core_1.Component({
            selector: 'my-high-dir',
            template: "\n  <h1>My First Attribute Directive</h1>\n  <p myHighlight>Highlight me!</p>\n  ",
            directives: [HighlightDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], AttributeDirectivesAreCool);
    return AttributeDirectivesAreCool;
}());
exports.AttributeDirectivesAreCool = AttributeDirectivesAreCool;
//Same Directive but with input property for color which is aliased to match the directive selector name
var HighlightDirective2 = (function () {
    function HighlightDirective2(el) {
        this._defaultColor = 'red';
        this.el = el.nativeElement;
    }
    HighlightDirective2.prototype.onMouseEnter = function () {
        this.highlight(this.highlightColor || this._defaultColor);
    };
    HighlightDirective2.prototype.onMouseLeave = function () {
        this.highlight(null);
    };
    HighlightDirective2.prototype.highlight = function (color) {
        this.el.style.backgroundColor = color;
    };
    __decorate([
        core_1.Input('myHighlight2'), 
        __metadata('design:type', String)
    ], HighlightDirective2.prototype, "highlightColor", void 0);
    __decorate([
        //input element
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighlightDirective2.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighlightDirective2.prototype, "onMouseLeave", null);
    HighlightDirective2 = __decorate([
        core_1.Directive({
            selector: '[myHighlight2]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HighlightDirective2);
    return HighlightDirective2;
}());
exports.HighlightDirective2 = HighlightDirective2;
var AttributeDirectivesAreCool2 = (function () {
    function AttributeDirectivesAreCool2() {
    }
    AttributeDirectivesAreCool2 = __decorate([
        core_1.Component({
            selector: 'my-high-dir',
            template: "\n<h1>My First Attribute Directive</h1>\n<h4>Pick a highlight color</h4>\n<div>\n  <input type=\"radio\" name=\"colors\" (click)=\"color='lightgreen'\">Green\n  <input type=\"radio\" name=\"colors\" (click)=\"color='yellow'\">Yellow\n  <input type=\"radio\" name=\"colors\" (click)=\"color='cyan'\">Cyan\n</div>\n<p [myHighlight2]=\"color\">Highlight me!</p>\n  ",
            directives: [HighlightDirective2]
        }), 
        __metadata('design:paramtypes', [])
    ], AttributeDirectivesAreCool2);
    return AttributeDirectivesAreCool2;
}());
exports.AttributeDirectivesAreCool2 = AttributeDirectivesAreCool2;
//bootstrap(AttributeDirectivesAreCool2)
//Our Diirective only has a single property. What if we had two properties?
var HighlightDirective3 = (function () {
    function HighlightDirective3(el) {
        this._defaultColor = 'red';
        this.el = el.nativeElement;
    }
    Object.defineProperty(HighlightDirective3.prototype, "defaultColor", {
        /*
        The defaultColor property has a setter that overrides the hard-coded default color, "red".
        We don't need a getter.
        How do we bind to it? We already "burned" the myHighlight attribute name as a binding target.
        Remember that a component is a directive too. We can add as many component property bindings
        as we need by stringing them along in the template as in this example that sets the a, b, c
        properties to the string literals 'a', 'b', and 'c'.
    
        <my-component [a]="'a'" [b]="'b'" [c]="'c'"><my-component>
    
         We do the same thing with an attribute directive.
        <p [myHighlight]="color" [defaultColor]="'violet'">
        Highlight me too!
        </p>
        */
        set: function (colorName) {
            this._defaultColor = colorName || this._defaultColor;
        },
        enumerable: true,
        configurable: true
    });
    HighlightDirective3.prototype.onMouseEnter = function () {
        this.highlight(this.highlightColor || this._defaultColor);
    };
    HighlightDirective3.prototype.onMouseLeave = function () {
        this.highlight(null);
    };
    HighlightDirective3.prototype.highlight = function (color) {
        this.el.style.backgroundColor = color;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], HighlightDirective3.prototype, "defaultColor", null);
    __decorate([
        core_1.Input('myHighlight3'), 
        __metadata('design:type', String)
    ], HighlightDirective3.prototype, "highlightColor", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighlightDirective3.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], HighlightDirective3.prototype, "onMouseLeave", null);
    HighlightDirective3 = __decorate([
        core_1.Directive({
            selector: '[myHighlight3]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HighlightDirective3);
    return HighlightDirective3;
}());
exports.HighlightDirective3 = HighlightDirective3;
var AttributeDirectivesAreCool3 = (function () {
    function AttributeDirectivesAreCool3() {
    }
    AttributeDirectivesAreCool3 = __decorate([
        core_1.Component({
            selector: 'my-high-dir',
            template: "\n<h1>My First Attribute Directive</h1>\n<h4>Pick a highlight color</h4>\n<div>\n  <input type=\"radio\" name=\"colors\" (click)=\"color='lightgreen'\">Green\n  <input type=\"radio\" name=\"colors\" (click)=\"color='yellow'\">Yellow\n  <input type=\"radio\" name=\"colors\" (click)=\"color='cyan'\">Cyan\n</div>\n<p [myHighlight3]=\"color\">Highlight me!</p>\n<p [myHighlight3]=\"color\" [defaultColor]=\"'violet'\">\n  Highlight me too!\n</p>\n  ",
            directives: [HighlightDirective3]
        }), 
        __metadata('design:paramtypes', [])
    ], AttributeDirectivesAreCool3);
    return AttributeDirectivesAreCool3;
}());
exports.AttributeDirectivesAreCool3 = AttributeDirectivesAreCool3;
platform_browser_dynamic_1.bootstrap(AttributeDirectivesAreCool3);
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////Component Styles////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
/*
Angular 2 applications are styled with regular CSS. That means we can apply everything we know about
CSS stylesheets, selectors, rules, and media queries to our Angular applications directly.

For every Angular 2 component we write, we may define not only an HTML template, but also the
CSS styles that go with that template, specifying any selectors, rules, and media queries that we need.

One way to do this is to set the styles property in the component metadata. The styles property
takes an array of strings that contain CSS code.

...
 selector: 'hero-app',
  template: `
    <h1>Tour of Heroes</h1>
    <hero-app-main [hero]=hero></hero-app-main>`,
  styles: ['h1 { font-weight: normal; }'],
  directives: [HeroAppMainComponent]
...

Component styles differ from traditional, global styles in a couple of ways.
Firstly, the selectors we put into a component's styles only apply within the template of that component.
The h1 selector in the example above only applies to the <h1> tag in the template of HeroAppComponent.
Any <h1> elements elsewhere in the application are unaffected.

Component styles have a few special selectors from the world of shadow DOM style scoping:

:host
Use the :host pseudo-class selector to target styles in the element that hosts the component
(as opposed to targeting elements inside the component's template):

:host {
  display: block;
  border: 1px solid black;
}

This is the only way we can target the host element. We cannot reach it from inside the component with other selectors,
because it is not part of the component's own template. It is in a parent component's template.
Use the function form to apply host styles conditionally by including another selector inside parentheses after :host.
In the next example we target the host element again,
but only when it also has the active CSS class.

:host(.active) {
  border-width: 3px;
}

:host-context
Sometimes it is useful to apply styles based on some condition outside a component's view.
For example, there may be a CSS theme class applied to the document <body> element, and we want to change how
our component looks based on that.
Use the :host-context() pseudo-class selector. It works just like the function form of :host().
It looks for a CSS class in any ancestor of the component host element, all the way up to the document root.
It's useful when combined with another selector.
In the following example, we apply a background-color style to all <h2> elements inside the component,
only if some ancestor element has the CSS class theme-light.


:host-context(.theme-light) h2 {
  background-color: #eef;
}

We can use the /deep/ selector to force a style down through the child component tree into all the child component views.
The /deep/ selector works to any depth of nested components, and it applies both to the view children and the content children of the component.
In this example, we target all <h3> elements, from the host element down through this component to all of its child elements in the DOM:
The /deep/ selector also has the alias >>>. We can use either of the two interchangeably.

:host /deep/ h3 {
  font-style: italic;
}

We have several ways to add styles to a component:
The scoping rules outlined above apply to each of these loading patterns.
-inline in the template HTML
=>We can embed styles directly into the HTML template by putting them inside <style> tags.
template: `
    <style>
      button {
        background-color: white;
        border: 1px solid #777;
      }
    </style>
    <h3>Controls</h3>
    <button (click)="activate()">Activate</button>
  `
=>We can also embed <link> tags into the component's HTML template.
As with styleUrls, the link tag's href URL is relative to the application root, not relative to the component file.
 template: `
    <link rel="stylesheet" href="app/hero-team.component.css">
    <h3>Team</h3>
    <ul>
      <li *ngFor="let member of hero.team">
        {{member}}
      </li>
    </ul>`

-by setting styles or styleUrls metadat
=>  selector: 'hero-details',
  template: `
    <h2>{{hero.name}}</h2>
    <hero-team [hero]=hero></hero-team>
    <ng-content></ng-content>
  `,
  styleUrls: ['app/hero-details.component.css'],
  directives: [HeroTeamComponent]
The URL is relative to the application root which is usually the location of the index.html web page
that hosts the application. The style file URL is not relative to the component file.
That's why the example URL begins app/.

-with CSS imports
We can also import CSS files into our CSS files by using the standard CSS @import rule.
In this case the URL is relative to the CSS file into which we are importing.
=> app/hero-details.component.css (excerpt)
   @import 'hero-details-box.css';


component CSS styles are encapsulated into the component's own view and do not affect the rest of the application.
We can control how this encapsulation happens on a per component basis by setting the view encapsulation mode in the component metadata.
There are three modes to choose from:
Native view encapsulation uses the browser's native Shadow DOM implementation to attach a Shadow DOM to the component's host element,
            and then puts the component view inside that Shadow DOM. The component's styles are included within the Shadow DOM.
Emulated view encapsulation (the default) emulates the behavior of Shadow DOM by preprocessing (and renaming)
              the CSS code to effectively scope the CSS to the component's view. See Appendix 1 for details.
None means that Angular does no view encapsulation. Angular adds the CSS to the global styles.
     The scoping rules, isolations, and protections discussed earlier do not apply. This is essentially the same as pasting the component's styles into the HTML.

Set the components encapsulation mode using the encapsulation property in the component metadata:
// warning: few browsers support shadow DOM encapsulation at this time
encapsulation: ViewEncapsulation.Native

*/ 
//# sourceMappingURL=appz.js.map