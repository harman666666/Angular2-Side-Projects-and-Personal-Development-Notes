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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable:no-unused-variable component-selector-name one-line check-open-brace */
/* tslint:disable:*/
var core_1 = require('@angular/core');
// A component base class (see AlexComponent)
var Base = (function () {
    function Base() {
        this.name = 'Count Basie';
    }
    return Base;
}());
exports.Base = Base;
// Marker class, used as an interface
/*
The Parent class-interface
We learned earlier that a class-interface is an abstract class used as an interface rather than as a base class.
Our example defines a Parent class-interface .
The Parent class-interface defines a name property with a type declaration but no implementation.,
The name property is the only member of a parent component that a child component can call.
Such a narrowing interface helps decouple the child component class from its parent components.
A component that could serve as a parent should implement the class-interface as the AliceComponent does:

export class AliceComponent implements Parent

Doing so adds clarity to the code. But it's not technically necessary.
Although the AlexComponent has a name property (as required by its Base class) its class signature doesn't mention Parent:

export class AlexComponent extends Base

The AlexComponent should implement Parent as a matter of proper style.
It doesn't in this example only to demonstrate that the code
will compile and run without the interface

*/
var Parent = (function () {
    function Parent() {
    }
    return Parent;
}());
exports.Parent = Parent;
var DifferentParent = Parent;
// Simpler syntax version that always provides the component in the name of `Parent`.
/*
Writing variations of the same parent alias provider gets old quickly, especially this awful mouthful with a forwardRef:
providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
We can extract that logic into a helper function like this:

Now we can add a simpler, more meaningful parent provider to our components:
providers:  [ provideParent(AliceComponent) ]
*/
var provideTheParent = function (component) {
    return { provide: Parent, useExisting: core_1.forwardRef(function () { return component; }) };
};
/*
We can do better. The current version of the helper function can only alias the Parent class-interface.
Our application might have a variety of parent types, each with its own class-interface token.
Here's a revised version that defaults to parent but also accepts an optional second
parameter for a different parent class-interface.

And here's how we could use it with a different parent type:
providers:  [ provideParent(BethComponent, DifferentParent) ]
*/
// Helper method to provide the current component instance in the name of a `parentType`.
// The `parentType` defaults to `Parent` when omitting the second parameter.
var provideParent = function (component, parentType) {
    return { provide: parentType || Parent, useExisting: core_1.forwardRef(function () { return component; }) };
};
///////// C - Child //////////
var templateC = "\n  <div class=\"c\">\n    <h3>{{name}}</h3>\n    <p>My parent is {{parent?.name}}</p>\n  </div>";
var CarolComponent = (function () {
    function CarolComponent(parent) {
        this.parent = parent;
        this.name = 'Carol';
    }
    CarolComponent = __decorate([
        core_1.Component({
            selector: 'carol',
            template: templateC
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Parent])
    ], CarolComponent);
    return CarolComponent;
}());
exports.CarolComponent = CarolComponent;
var ChrisComponent = (function () {
    function ChrisComponent(parent) {
        this.parent = parent;
        this.name = 'Chris';
    }
    ChrisComponent = __decorate([
        core_1.Component({
            selector: 'chris',
            template: templateC
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Parent])
    ], ChrisComponent);
    return ChrisComponent;
}());
exports.ChrisComponent = ChrisComponent;
//////  Craig ///////////
/**
 * Show we cannot inject a parent by its base class.
We are asking can a component inject its parent via the parent's base class?
The sample's CraigComponent explores this question.
Looking back we see that the Alex component extends (inherits) from a class named Base
The CraigComponent tries to inject Base into its alex constructor parameter and reports if it succeeded.
Unfortunately, this does not work. The live example confirms that the alex parameter is null. We cannot inject a parent by its base class.
 */
var CraigComponent = (function () {
    function CraigComponent(alex) {
        this.alex = alex;
    }
    CraigComponent = __decorate([
        core_1.Component({
            selector: 'craig',
            template: "\n  <div class=\"c\">\n    <h3>Craig</h3>\n    {{alex ? 'Found' : 'Did not find'}} Alex via the base class.\n  </div>"
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Base])
    ], CraigComponent);
    return CraigComponent;
}());
exports.CraigComponent = CraigComponent;
var C_DIRECTIVES = [
    CarolComponent, ChrisComponent, CraigComponent,
    core_1.forwardRef(function () { return CathyComponent; })
];
//////// B - Parent /////////
var templateB = "\n  <div class=\"b\">\n    <div>\n      <h3>{{name}}</h3>\n      <p>My parent is {{parent?.name}}</p>\n    </div>\n    <carol></carol>\n    <chris></chris>\n  </div>";
var BarryComponent = (function () {
    function BarryComponent(parent) {
        this.parent = parent;
        /*
        Find the parent in a tree of parents
    
    Imagine one branch of a component hierarchy:
        Alice -> Barry -> Carol. Both Alice and Barry implement the Parent class-interface.
    
    Barry is the problem. He needs to reach his parent, Alice, and also be a parent to Carol.
        That means he must both inject the Parent class-interface to get Alice and provide a Parent to satisfy Carol.
    
    Here's Barry:
    
        Barry's providers array looks just like Alex's. If we're going to keep writing alias providers like this we should create a helper function.
    For now, focus on Barry's constructor:
        It's identical to Carol's constructor except for the additional @SkipSelf decorator.
    
    @SkipSelf is essential for two reasons:
    
    It tell the injector to start its search for a Parent dependency in a component above itself, which is what parent means.
    
    Angular throws a cyclic dependency error if we omit the @SkipSelf decorator.
    
    Cannot instantiate cyclic dependency! (BethComponent -> Parent -> BethComponent)
        */
        this.name = 'Barry';
    }
    BarryComponent = __decorate([
        core_1.Component({
            selector: 'barry',
            template: templateB,
            directives: C_DIRECTIVES,
            providers: [{ provide: Parent, useExisting: core_1.forwardRef(function () { return BarryComponent; }) }]
        }),
        __param(0, core_1.SkipSelf()),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Parent])
    ], BarryComponent);
    return BarryComponent;
}());
exports.BarryComponent = BarryComponent;
var BobComponent = (function () {
    function BobComponent(parent) {
        this.parent = parent;
        this.name = 'Bob';
    }
    BobComponent = __decorate([
        core_1.Component({
            selector: 'bob',
            template: templateB,
            directives: C_DIRECTIVES,
            providers: [provideParent(BobComponent)]
        }),
        __param(0, core_1.SkipSelf()),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Parent])
    ], BobComponent);
    return BobComponent;
}());
exports.BobComponent = BobComponent;
var BethComponent = (function () {
    function BethComponent(parent) {
        this.parent = parent;
        this.name = 'Beth';
    }
    BethComponent = __decorate([
        core_1.Component({
            selector: 'beth',
            template: templateB,
            directives: C_DIRECTIVES,
            providers: [provideParent(BethComponent, DifferentParent)]
        }),
        __param(0, core_1.SkipSelf()),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [Parent])
    ], BethComponent);
    return BethComponent;
}());
exports.BethComponent = BethComponent;
var B_DIRECTIVES = [BarryComponent, BethComponent, BobComponent];
///////// A - Grandparent //////
/*
We can find a parent component with a class-interface.
The parent must cooperate by providing an alias to itself in the name of a class-interface token.
Recall that Angular always adds a component instance to its own injector; that's why we could inject Alex into Carol earlier.
We write an alias provider � a provide object literal with a useExisting definition �
that creates an alternative way to inject the same component instance and add that provider
to the providers array of the @Component metadata for the AlexComponent:
Parent is the provider's class-interface token. The forwardRef breaks the circular reference we just created by having the AlexComponent refer to itself.

Carol, the third of Alex's child components, injects the parent into its parent parameter, the same way we've done it before:
export class CarolComponent {
  name= 'Carol';
  constructor( @Optional() public parent: Parent ) { }

Cathy found alex via the component class
Craig did not find Alex via the Base Class
Carol => My parent is Alex
}
*/
var AlexComponent = (function (_super) {
    __extends(AlexComponent, _super);
    function AlexComponent() {
        _super.apply(this, arguments);
        this.name = 'Alex';
    }
    AlexComponent = __decorate([
        core_1.Component({
            selector: 'alex',
            template: "\n    <div class=\"a\">\n      <h3>{{name}}</h3>\n      <cathy></cathy>\n      <craig></craig>\n      <carol></carol>\n    </div>",
            providers: [{ provide: Parent, useExisting: core_1.forwardRef(function () { return AlexComponent; }) }],
            directives: C_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [])
    ], AlexComponent);
    return AlexComponent;
}(Base));
exports.AlexComponent = AlexComponent;
/////
var AliceComponent = (function () {
    function AliceComponent() {
        this.name = 'Alice';
    }
    AliceComponent = __decorate([
        core_1.Component({
            selector: 'alice',
            template: "\n    <div class=\"a\">\n      <h3>{{name}}</h3>\n      <barry></barry>\n      <beth></beth>\n      <bob></bob>\n      <carol></carol>\n    </div> ",
            directives: [B_DIRECTIVES, C_DIRECTIVES],
            providers: [provideParent(AliceComponent)]
        }), 
        __metadata('design:paramtypes', [])
    ], AliceComponent);
    return AliceComponent;
}());
exports.AliceComponent = AliceComponent;
//////  Cathy ///////////
/**
 * Show we can inject a parent by component type
 */
var CathyComponent = (function () {
    function CathyComponent(alex) {
        this.alex = alex;
    } //INJECTED
    CathyComponent = __decorate([
        core_1.Component({
            selector: 'cathy',
            template: "\n  <div class=\"c\">\n    <h3>Cathy</h3>\n    {{alex ? 'Found' : 'Did not find'}} Alex via the component class.<br>\n  </div>"
        }),
        __param(0, core_1.Optional()), 
        __metadata('design:paramtypes', [AlexComponent])
    ], CathyComponent);
    return CathyComponent;
}());
exports.CathyComponent = CathyComponent;
///////// ParentFinder //////
var ParentFinderComponent = (function () {
    function ParentFinderComponent() {
    }
    ParentFinderComponent = __decorate([
        core_1.Component({
            selector: 'parent-finder',
            template: "\n    <h2>Parent Finder</h2>\n    <alex></alex>\n    <alice></alice>",
            directives: [AlexComponent, AliceComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ParentFinderComponent);
    return ParentFinderComponent;
}());
exports.ParentFinderComponent = ParentFinderComponent;
/*
Break circularities with a forward class reference (forwardRef)

The order of class declaration matters in TypeScript. We can't refer directly to a class until it's been defined.

This isn't usually a problem, especially if we adhere to the recommended one class per file rule.
But sometimes circular references are unavoidable. We're in a bind when class
'A refers to class 'B' and 'B' refers to 'A'. One of them has to be defined first.

The Angular forwardRef function creates an indirect reference that Angular can resolve later.

The Parent Finder sample is full of circular class references that are impossible to break.

In the Alex/Cathy example above:

the AlexComponent lists the CathyComponent in its component metadata directives array so it can display Cathy in its template.

the CathyComponent constructor injects the parent AlexComponent which means that the alex parameter of its constructor has the AlexComponent type.

Alex refers to Cathy and Cathy refers to Alex. We're stuck. We must define one of them first.

We defined Alex first and built its C_DIRECTIVES array with a forward reference to Cathy:

parent-finder.component.ts (C_DIRECTIVES)

const C_DIRECTIVES = [
  CarolComponent, ChrisComponent, CraigComponent,
  forwardRef(() => CathyComponent)
];
Defining Alex and Cathy in separate files won't help. Alex would have to import Cathy and Cathy would have to import Alex.

We had to define Alex first because, while we can add forwardRef(CathyComponent) to Alex's
directives array, we can't write public alex: forwardRef(AlexComponent)) in Cathy's constructor.

We face a similar dilemma when a class makes a reference to itself as does the AlexComponent
in its providers array. The providers array is a property of the @Component decorator function which must appear above the class definition.

Again we break the circularity with forwardRef:

parent-finder.component.ts (AlexComponent providers)

providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],

*/ 
//# sourceMappingURL=parent-finder.component.js.map