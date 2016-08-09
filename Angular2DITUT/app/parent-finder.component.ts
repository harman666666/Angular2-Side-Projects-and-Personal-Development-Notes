/* tslint:disable:no-unused-variable component-selector-name one-line check-open-brace */
/* tslint:disable:*/
import { Component, forwardRef, Optional, provide, SkipSelf } from '@angular/core';

// A component base class (see AlexComponent)
export abstract class Base { name = 'Count Basie'; }

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
export abstract class Parent { name: string; }

const DifferentParent = Parent;



// Simpler syntax version that always provides the component in the name of `Parent`.
/*
Writing variations of the same parent alias provider gets old quickly, especially this awful mouthful with a forwardRef:
providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
We can extract that logic into a helper function like this:

Now we can add a simpler, more meaningful parent provider to our components:
providers:  [ provideParent(AliceComponent) ]
*/
const provideTheParent =
  (component: any) => {
    return { provide: Parent, useExisting: forwardRef(() => component) };
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
const provideParent =
    (component: any, parentType?: any) => {
        return { provide: parentType || Parent, useExisting: forwardRef(() => component) };
    };

///////// C - Child //////////
const templateC = `
  <div class="c">
    <h3>{{name}}</h3>
    <p>My parent is {{parent?.name}}</p>
  </div>`;

@Component({
  selector: 'carol',
  template: templateC
})
export class CarolComponent {
  name= 'Carol';
  constructor( @Optional() public parent: Parent ) { }
}

@Component({
  selector: 'chris',
  template: templateC
})
export class ChrisComponent {
  name= 'Chris';
  constructor( @Optional() public parent: Parent ) { }
}

//////  Craig ///////////
/**
 * Show we cannot inject a parent by its base class.
We are asking can a component inject its parent via the parent's base class?
The sample's CraigComponent explores this question.
Looking back we see that the Alex component extends (inherits) from a class named Base
The CraigComponent tries to inject Base into its alex constructor parameter and reports if it succeeded.
Unfortunately, this does not work. The live example confirms that the alex parameter is null. We cannot inject a parent by its base class.
 */
@Component({
  selector: 'craig',
  template: `
  <div class="c">
    <h3>Craig</h3>
    {{alex ? 'Found' : 'Did not find'}} Alex via the base class.
  </div>`
})
export class CraigComponent {
  constructor( @Optional() public alex: Base ) { }
}

const C_DIRECTIVES = [
  CarolComponent, ChrisComponent, CraigComponent,
  forwardRef(() => CathyComponent)
];

//////// B - Parent /////////
const templateB = `
  <div class="b">
    <div>
      <h3>{{name}}</h3>
      <p>My parent is {{parent?.name}}</p>
    </div>
    <carol></carol>
    <chris></chris>
  </div>`;

@Component({
  selector:   'barry',
  template:   templateB,
  directives: C_DIRECTIVES,
  providers:  [{ provide: Parent, useExisting: forwardRef(() => BarryComponent) }]
})
export class BarryComponent implements Parent {
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
  name = 'Barry';
  constructor( @SkipSelf() @Optional() public parent: Parent ) { }
}

@Component({
  selector:   'bob',
  template:   templateB,
  directives: C_DIRECTIVES,
  providers:  [ provideParent(BobComponent) ]
})
export class BobComponent implements Parent {
  name= 'Bob';
  constructor( @SkipSelf() @Optional() public parent: Parent ) { }
}

@Component({
  selector:   'beth',
  template:   templateB,
  directives: C_DIRECTIVES,
  providers:  [ provideParent(BethComponent, DifferentParent) ]
})
export class BethComponent implements Parent {
  name= 'Beth';
  constructor( @SkipSelf() @Optional() public parent: Parent ) { }
}

const B_DIRECTIVES = [ BarryComponent, BethComponent, BobComponent ];

///////// A - Grandparent //////
/*
We can find a parent component with a class-interface.
The parent must cooperate by providing an alias to itself in the name of a class-interface token.
Recall that Angular always adds a component instance to its own injector; that's why we could inject Alex into Carol earlier.
We write an alias provider — a provide object literal with a useExisting definition —
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
@Component({
  selector: 'alex',
  template: `
    <div class="a">
      <h3>{{name}}</h3>
      <cathy></cathy>
      <craig></craig>
      <carol></carol>
    </div>`,
  providers: [{ provide: Parent, useExisting: forwardRef(() => AlexComponent) }],
  directives: C_DIRECTIVES
})
// Todo: Add `... implements Parent` to class signature
export class AlexComponent extends Base
{
  name= 'Alex';
}

/////

@Component({
  selector: 'alice',
  template: `
    <div class="a">
      <h3>{{name}}</h3>
      <barry></barry>
      <beth></beth>
      <bob></bob>
      <carol></carol>
    </div> `,
  directives: [ B_DIRECTIVES, C_DIRECTIVES ],
  providers:  [ provideParent(AliceComponent) ]
})
export class AliceComponent implements Parent
{
  name= 'Alice';
}

//////  Cathy ///////////
/**
 * Show we can inject a parent by component type
 */
@Component({
  selector: 'cathy',
  template: `
  <div class="c">
    <h3>Cathy</h3>
    {{alex ? 'Found' : 'Did not find'}} Alex via the component class.<br>
  </div>`
})
export class CathyComponent {
  constructor( @Optional() public alex: AlexComponent ) { } //INJECTED
}

///////// ParentFinder //////
@Component({
  selector: 'parent-finder',
  template: `
    <h2>Parent Finder</h2>
    <alex></alex>
    <alice></alice>`,
  directives: [ AlexComponent, AliceComponent ]
})
export class ParentFinderComponent { }


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