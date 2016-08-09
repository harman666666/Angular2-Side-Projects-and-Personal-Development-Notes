/*
What is ES5? What is ES6? ES5 is short for “ECMAScript 5”, otherwise known as “regular
Javascript”. ES5 is the normal Javascript we all know and love. It runs in more-or-less every
browser. ES6 is the next version of Javascript, which we talk more about below.

For converting TypeScript to ES5 there is a single transpiler written by the core TypeScript
team. However if we wanted to convert ES6 code (not TypeScript) to ES5 there are two
major ES6-to-ES5 transpilers: traceur²⁴ by Google and babel²⁵ created by the JavaScript
community

There are five big improvements that TypeScript bring over ES5:
• types
• classes
• annotations
• imports
• language utilities (e.g. destructuring)

It’s also worth noting that types are optional in TypeScript. If we want to write some quick code or
prototype a feature, we can omit types and gradually add them as the code becomes more mature.
TypeScript’s basic types are the same ones we’ve been using implicitly when we write “normal”
JavaScript code: strings, numbers, booleans, etc.
Up until ES5, we would define variables with the var keyword, like var name;.
The new TypeScript syntax is a natural evolution from ES5, we still use var but now we can
optionally provide the variable type along with its name:
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var name2 = 'HIII';
var name = 'BYEEE';
//TS HAS GET AND SET 
var foo = (function () {
    function foo() {
        this._bar = false;
    }
    Object.defineProperty(foo.prototype, "bar", {
        get: function () {
            return this._bar;
        },
        set: function (theBar) {
            this._bar = theBar;
        },
        enumerable: true,
        configurable: true
    });
    return foo;
}());
//TO USE GET AND SET
var myFoo = new foo();
if (myFoo.bar) {
    myFoo.bar = false; // calls the setter and passes false
}
//When declaring functions we can use types for arguments and return values:
function greettext(name) { return "Hello " + name; }
//Our code won’t
//compile if we call this function with anything other than a string and that’s a good thing because
//otherwise we’d introduce a bug.
function greetText(name) { return "Hello " + name; }
var name = 'Felipe';
var age = 3;
var married = true;
//Arrays
var jobs = ['IBM', 'Microsoft', 'Google'];
var jobs2 = ['Apple', 'Dell', 'HP'];
//Enums, default initial value is 0:
var Role;
(function (Role) {
    Role[Role["Employee"] = 0] = "Employee";
    Role[Role["Manager"] = 1] = "Manager";
    Role[Role["Admin"] = 2] = "Admin";
})(Role || (Role = {}));
;
var role = Role.Admin;
var Role2;
(function (Role2) {
    Role2[Role2["Employee"] = 3] = "Employee";
    Role2[Role2["Manager"] = 4] = "Manager";
    Role2[Role2["Admin"] = 5] = "Admin";
})(Role2 || (Role2 = {}));
;
var role2 = Role2.Employee; //Employee is 3, Manager is 4, Admin is 5
var Role3;
(function (Role3) {
    Role3[Role3["Employee"] = 3] = "Employee";
    Role3[Role3["Manager"] = 5] = "Manager";
    Role3[Role3["Admin"] = 7] = "Admin";
})(Role3 || (Role3 = {}));
var role3 = Role3.Employee;
//You can also look up the name of a given enum, but using its value 
console.log('Roles: ', Role[0], ',', Role[1], 'and', Role[2]);
/*
Any
any is the default type if we omit typing for a given variable. Having a variable of type any allows
it to receive any kind of value:
*/
var something = 'as string';
something = 1;
something = [1, 2, 3];
//Using void means theres no type expected. Usually in fcuntions with no return value
function setName(name) {
    this.name = name;
}
/*
In Javascript ES5 object oriented programming was accomplished by using prototype-based objects.
This model doesn’t use classes, but instead relies on prototypes.

Typescript has classes whcih can have properties, methods, and constructors
*/
function People(length, width, height, name) {
    this.length = length;
    this.width = width;
    this.height = height;
    this.name = name;
    this.volume = function () {
        return this.length * this.width * this.height;
    };
}
var person1 = new People(2, 3, 4, 'hillary');
person1.length = 4;
console.log('Volume of this guy', person1.volume());
var Person = (function () {
    function Person(first_name, last_name, age) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
    }
    /*
    Methods are functions that run in context of an object. To call a method on an object, we first have
    to have an instance of that object.

    To instantiate a class, we use the new keyword. Use new Person() to create a new instance
    of the Person class, for example.
    */
    Person.prototype.greetText = function () {
        console.log("Hello", this.first_name);
    };
    Person.prototype.ageInYears = function (years) {
        return this.age + years;
    };
    return Person;
}());
var p;
p = new Person('harry', 'potter', 18);
p.first_name = 'Felipe';
p.greetText();
var Vehicle = (function () {
    /*
        Constructor methods must be named constructor. They can optionally take parameters but they
    can’t return any values, since they are called when the class is being instantiated (i.e. an instance of
    the class is being created, no other value can be returned).
        When a class has no constructor defined explicitly one will be created automatically:
    
         In TypeScript you can have only one constructor per class.
    That is a departure from ES6 which allows one class to have more than one constructor as
    long as they have a different number of parameters.
    
        */
    function Vehicle() {
    }
    return Vehicle;
}());
var v = new Vehicle();
/*
TypeScript fully supports inheritance and, unlike ES5, it’s built into the core language. Inheritance
is achieved through the extends keyword.
*/
var Report = (function () {
    function Report(data) {
        this.data = data;
    }
    Report.prototype.run = function () {
        //this.data.forEach(function (line): void { console.log(line); });
        //We can use fat arrow syntax for this:
        this.data.forEach(function (line) { return console.log(line); });
        //The => is being used here as a statement, but it can be used like an expression.
    };
    return Report;
}());
//=> used as an expression
var evens = [2, 4, 6, 8];
var odds = evens.map(function (v) { return v + 1; });
var TabbedReport = (function (_super) {
    __extends(TabbedReport, _super);
    function TabbedReport(headers, values) {
        _super.call(this, values);
        this.headers = headers;
    }
    TabbedReport.prototype.run = function () {
        console.log(this.headers);
        _super.prototype.run.call(this);
    };
    return TabbedReport;
}(Report));
var headers = ['Name'];
var data = ['Alice Green', 'Paul', 'Louis Castricato'];
var r = new TabbedReport(headers, data);
r.run();
/*
 One important feature of the => syntax is that it shares the same this as the surrounding code. This
is important and different than what happens when you normally create a function in Javascript.
Generally when you write a function in Javascript that function is given its own this. Sometimes
in Javascript we see code like this:
 */
var nate = {
    name: 'Nate',
    guitars: ["Gibson", "Martin", "Taylor"],
    printGuitars: function () {
        var self = this;
        this.guitarts.forEach(function (g) {
            //this.name is undefined, so we have to use self.name
            console.log(self.name + " plays a " + g);
        });
    }
};
//because fat arrow shares this with its surrounding code, can rewrite like this:
var nate = {
    name: 'Nate',
    guitars: ["Gibson", "Martin", "Taylor"],
    printGuitars: function () {
        var _this = this;
        var self = this;
        this.guitarts.forEach(function (g) { console.log(_this.name + " plays a " + g); });
    }
};
/*
In ES6 new template strings were introduced. The two great features of template strings are
1. Variables within strings (without being forced to concatenate with +) (called string interpolation) and
2. Multi-line strings
*/
//To use string interpolation, tou must enclose string in back ticks, not single or double quotes.
var firstName = "Nate";
var lastName = "Murray";
var greetingzz = "Hello " + firstName + " " + lastName;
console.log(greetingzz);
////////////////////////////////////////////////////////////////////////////////////////////////////////
// There are 3 basic types in TypeScript
var isDone = false;
var lines = 42;
var name = "Anders";
// When it's impossible to know, there is the "Any" type
var notSure = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
// For collections, there are typed arrays and generic arrays
var list = [1, 2, 3];
// Alternatively, using the generic array type
var list = [1, 2, 3];
// For enumerations:
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
// Lastly, "void" is used in the special case of a function returning nothing
function bigHorribleAlert() {
    alert("I'm a little annoying box!");
}
// Functions are first class citizens, support the lambda "fat arrow" syntax and
// use type inference
// The following are equivalent, the same signature will be infered by the
// compiler, and same JavaScript will be emitted
var f1 = function (i) { return i * i; };
// Return type inferred
var f2 = function (i) { return i * i; };
var f3 = function (i) { return i * i; };
// Return type inferred
var f4 = function (i) { return i * i; };
// Return type inferred, one-liner means no return keyword needed
var f5 = function (i) { return i * i; };
// Object that implements the "Person" interface
// Can be treated as a Person since it has the name and move properties
var p = { name: "Bobby", move: function () { } };
// Objects that have the optional property:
var validPerson = { name: "Bobby", age: 42, move: function () { } };
// Only the parameters' types are important, names are not important.
var mySearch;
mySearch = function (src, sub) {
    return src.search(sub) != -1;
};
// Classes - members are public by default
var Point = (function () {
    // Constructor - the public/private keywords in this context will generate
    // the boiler plate code for the property and the initialization in the
    // constructor.
    // In this example, "y" will be defined just like "x" is, but with less code
    // Default values are also supported
    function Point(x, y) {
        if (y === void 0) { y = 0; }
        this.y = y;
        this.x = x;
    }
    // Functions
    Point.prototype.dist = function () { return Math.sqrt(this.x * this.x + this.y * this.y); };
    // Static members
    Point.origin = new Point(0, 0);
    return Point;
}());
var p1 = new Point(10, 20);
var p2 = new Point(25); //y will be 0
// Inheritance
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        if (z === void 0) { z = 0; }
        _super.call(this, x, y); // Explicit call to the super class constructor is mandatory
        this.z = z;
    }
    // Overwrite
    Point3D.prototype.dist = function () {
        var d = _super.prototype.dist.call(this);
        return Math.sqrt(d * d + this.z * this.z);
    };
    return Point3D;
}(Point));
// Modules, "." can be used as separator for sub modules
var Geometry;
(function (Geometry) {
    var Square = (function () {
        function Square(sideLength) {
            if (sideLength === void 0) { sideLength = 0; }
            this.sideLength = sideLength;
        }
        Square.prototype.area = function () {
            return Math.pow(this.sideLength, 2);
        };
        return Square;
    }());
    Geometry.Square = Square;
})(Geometry || (Geometry = {}));
var s1 = new Geometry.Square(5);
// Local alias for referencing a module
var G = Geometry;
var s2 = new G.Square(10);
// Generics
// Classes
var Tuple = (function () {
    function Tuple(item1, item2) {
        this.item1 = item1;
        this.item2 = item2;
    }
    return Tuple;
}());
// And functions
var pairToTuple = function (p) {
    return new Tuple(p.item1, p.item2);
};
var tuple = pairToTuple({ item1: "hello", item2: "world" });
// Including references to a definition file:
/// <reference path="jquery.d.ts" />
// Template Strings (strings that use backticks)
// String Interpolation with Template Strings
var name = 'Tyrone';
var greeting = "Hi " + name + ", how are you?";
// Multiline Strings with Template Strings
var multiline = "This is an example\nof a multiline string";
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
Interfaces
Introduction
One of TypeScript’s core principles is that type-checking focuses on the shape that values have. This is sometimes called “duck typing” or
“structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts
within your code as well as contracts with code outside of your project.

Our First Interface
The easiest way to see how interfaces work is to start with a simple example:

function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
The type-checker checks the call to printLabel. The printLabel function has a single parameter that requires that the object passed
in has a property called label of type string. Notice that our object actually has more properties than this, but the compiler only
checks that at least the ones required are present and match the types required. There are some cases where TypeScript isn’t as lenient,
which we’ll cover in a bit.

We can write the same example again, this time using an interface to describe the requirement of having the label property that is a string:

interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
The interface LabelledValue is a name we can now use to describe the requirement in the previous example. It still represents
having a single property called label that is of type string. Notice we didn’t have to explicitly say that the object we pass to
printLabel implements this interface like we might have to in other languages. Here, it’s only the shape that matters.
If the object we pass to the function meets the requirements listed, then it’s allowed.

It’s worth pointing out that the type-checker does not require that these properties come in any sort of order, only
that the properties the interface requires are present and have the required type.

Optional Properties
Not all properties of an interface may be required. Some exist under certain conditions or may not be there at all.
These optional properties are popular when creating patterns like “option bags” where you pass an object to a
function that only has a couple of properties filled in.

Here’s an example of this pattern:

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
Interfaces with optional properties are written similar to other interfaces, with each optional property denoted by a ?
at the end of the property name in the declaration.

The advantage of optional properties is that you can describe these possibly available properties while still also
preventing use of properties that are not part of the interface. For example, had we mistyped the name of the
color property in createSquare, we would get an error message letting us know:

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        // Error: Property 'collor' does not exist on type 'SquareConfig'
        newSquare.color = config.collor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
Excess Property Checks
In our first example using interfaces, TypeScript let us pass { size: number; label: string; } to something
that only expected a { label: string; }. We also just learned about optional properties, and how they’re useful when describing so-called “option bags”.

However, combining the two naively would let you to shoot yourself in the foot the same way you might in JavaScript.
For example, taking our last example using createSquare:

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
Notice the given argument to createSquare is spelled colour instead of color. In plain JavaScript, this sort of thing fails silently.

You could argue that this program is correctly typed, since the width properties are compatible, there’s no color property present,
and the extra colour property is insignificant.

However, TypeScript takes the stance that there’s probably a bug in this code. Object literals get special treatment and undergo excess property checking
when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type”
doesn’t have, you’ll get an error.

// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
Getting around these checks is actually really simple. The easiest method is to just use a type assertion:

let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
However, a better approach might be to add a string index signature if you’re sure that the object can have some extra properties that are used in some special way. If SquareConfigs can have color and width properties with the above types, but could also have any number of other properties, then we could define it like so:

interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
We’ll discuss index signatures in a bit, but here we’re saying a SquareConfig can have any number of properties, and as long as they aren’t color or width, their types don’t matter.

One final way to get around these checks, which might be a bit surprising, is to assign the object to another variable: Since squareOptions won’t undergo excess property checks, the compiler won’t give you an error.

let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
Keep in mind that for simple code like above, you probably shouldn’t be trying to “get around” these checks. For more complex object literals that have methods and hold state, you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs. That means if you’re running into excess property checking problems for something like option bags, you might need to revise some of your type declarations. In this instance, if it’s okay to pass an object with both a color or colour property to createSquare, you should fix up the definition of SquareConfig to reflect that.

Function Types
Interfaces are capable of describing the wide range of shapes that JavaScript objects can take. In addition to describing an object with properties, interfaces are also capable of describing function types.

To describe a function type with an interface, we give the interface a call signature. This is like a function declaration with only the parameter list and return type given. Each parameter in the parameter list requires both name and type.

interface SearchFunc {
    (source: string, subString: string): boolean;
}
Once defined, we can use this function type interface like we would other interfaces. Here, we show how you can create a variable of a function type and assign it a function value of the same type.

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}
For function types to correctly type-check, the names of the parameters do not need to match. We could have, for example, written the above example like this:

let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}
Function parameters are checked one at a time, with the type in each corresponding parameter position checked against each other. If you do not want to specify types at all, Typescript’s contextual typing can infer the argument types since the function value is assigned directly to a variable of type SearchFunc. Here, also, the return type of our function expression is implied by the values it returns (here false and true). Had the function expression returned numbers or strings, the type-checker would have warned us that return type doesn’t match the return type described in the SearchFunc interface.

let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}
Indexable Types
Similarly to how we can use interfaces to describe function types, we can also describe types that we can “index into” like a[10], or ageMap["daniel"]. Indexable types have an index signature that describes the types we can use to index into the object, along with the corresponding return types when indexing. Let’s take an example:

interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
Above, we have a StringArray interface that has an index signature. This index signature states that when a StringArray is indexed with a number, it will return a string.

There are two types of supported index signatures: string and number. It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.

class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
While string index signatures are a powerful way to describe the “dictionary” pattern, they also enforce that all properties match their return type. This is because a string index declares that obj.property is also available as obj["property"]. In the following example, name’s type does not match the string index’s type, and the type-checker gives an error:

interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}
Class Types
Implementing an interface

One of the most common uses of interfaces in languages like C# and Java, that of explicitly enforcing that a class meets a particular contract, is also possible in TypeScript.

interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
You can also describe methods in an interface that are implemented in the class, as we do with setTime in the below example:

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
Interfaces describe the public side of the class, rather than both the public and private side. This prohibits you from using them to check that a class also has particular types for the private side of the class instance.

Difference between the static and instance sides of classes

When working with classes and interfaces, it helps to keep in mind that a class has two types: the type of the static side and the type of the instance side. You may notice that if you create an interface with a construct signature and try to create a class that implements this interface you get an error:

interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
This is because when a class implements an interface, only the instance side of the class is checked. Since the constructor sits in the static side, it is not included in this check.

Instead, you would need to work with the static side of the class directly. In this example, we define two interfaces, ClockConstructor for the constructor and ClockInterface for the instance methods. Then for convenience we define a constructor function createClock that creates instances of the type that is passed to it.

interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
Because createClock’s first parameter is of type ClockConstructor, in createClock(AnalogClock, 7, 32), it checks that AnalogClock has the correct constructor signature.

Extending Interfaces
Like classes, interfaces can extend each other. This allows you to copy the members of one interface into another, which gives you more flexibility in how you separate your interfaces into reusable components.

interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
An interface can extend multiple interfaces, creating a combination of all of the interfaces.

interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
Hybrid Types
As we mentioned earlier, interfaces can describe the rich types present in real world JavaScript. Because of JavaScript’s dynamic and flexible nature, you may occasionally encounter an object that works as a combination of some of the types described above.

One such example is an object that acts as both a function and an object, with additional properties:

interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
When interacting with 3rd-party JavaScript, you may need to use patterns like the above to fully describe the shape of the type.

Interfaces Extending Classes
When an interface type extends a class type it inherits the members of the class but not their implementations. It is as if the interface had declared all of the members of the class without providing an implementation. Interfaces inherit even the private and protected members of a base class. This means that when you create an interface that extends a class with private or protected members, that interface type can only be implemented by that class or a subclass of it.

This is useful when you have a large inheritance hierarchy, but want to specify that your code works with only subclasses that have certain properties. The subclasses don’t have to be related besides inheriting from the base class. For example:

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control {
    select() { }
}

class TextBox extends Control {
    select() { }
}

class Image extends Control {
}

class Location {
    select() { }
}
In the above example, SelectableControl contains all of the members of Control, including the private state property. Since state is a private member it is only possible for descendants of Control to implement SelectableControl. This is because only descendants of Control will have a state private member that originates in the same declaration, which is a requirement for private members to be compatible.

Within the Control class it is possible to access the state private member through an instance of SelectableControl. Effectively, a SelectableControl acts like a Control that is known to have a select method. The Button and TextBox classes are subtypes of SelectableControl (because they both inherit from Control and have a select method), but the Image and Location classes are not.


*/ 
//# sourceMappingURL=app.js.map