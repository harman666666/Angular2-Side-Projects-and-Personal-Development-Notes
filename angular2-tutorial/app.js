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
var common_1 = require('@angular/common');
var Observable_1 = require('rxjs/Observable');
require('rxjs/RX'); //Import all of rxjs
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
/*
HTTP has been split into a separate module in Angular 2. This means that to use it you need to import
constants from @angular/http. For instance, we might import constants from @angular/http like
this:
1 import { Http, Response, RequestOptions, Headers } from '@angular/http';
import from @angular/http
In our app.ts we’re going to import HTTP_PROVIDERS which is a convenience collection of modules.

When we bootstrap our app we will add HTTP_PROVIDERS as a dependency. The effect is that we will
be able to inject Http (and a few other modules) into our components.

1 bootstrap(HttpApp, [ HTTP_PROVIDERS ]);
Now we can inject the Http service into our components (or anywhere we use DI, actually).
1 class MyFooComponent {
2 constructor(public http: Http) {
3 }
4
5 makeRequest(): void {
6 // do something with this.http ...
7 }
8 }



*/
/*
Let’s create our very first component. When we have this component written, we will be able to use
it in our HTML document like so:

Think of annotations as metadata added to your code. When we use @Component on the HelloWorld
class, we are “decorating” the HelloWorld as a Component.
We want to be able to use this component in our markup by using a <hello-world> tag. To do that
we configure the @Component and specify the selector as hello-world.

Notice that we’re defining our template string between backticks (` … `). This is a new (and
fantastic) feature of ES6 that allows us to do multiline strings. Using backticks for multiline strings
makes it easy to put templates inside your code files.
*/
var HelloWorld = (function () {
    function HelloWorld() {
        this.name = 'Felipe';
        this.names2 = ['Ari', 'Carlos', 'Felipe', 'Nate'];
    }
    HelloWorld = __decorate([
        core_1.Component({
            selector: 'hello-world',
            /*
            On the template notice that we added a new syntax: {{ name }}. The brackets are called “templatetags”
        (or “mustache tags”). Whatever is between the template tags will be expanded as an expression.
        Here, because the template is bound to our Component, the name will expand to the value of
        this.name i.e. 'Felipe'.
        
            *ngFor="let name2 of names2" attribute. The * and # characters can be a little overwhelming at
        first, so let’s break it down:
        The *ngFor syntax says we want to use the NgFor directive on this attribute. You can think of NgFor
        akin to a for loop; the idea is that we’re creating a new DOM element for every item in a collection.
        The value states: "let name2 of names2". names2 is our array of names as specified on the HelloWorld
        object. let name2 is called a reference. When we say "let name2 of names2" we’re saying loop over
        each element in names and assign each one to a variable called name.
            */
            template: "\n  <div>\n    Hello {{ name }}\n  </div>\n    <br />\n    <ul>\n        <li *ngFor = \"let name2 of names2\">Hello {{name2}} </li>\n    </ul>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HelloWorld);
    return HelloWorld;
}());
//bootstrap(HelloWorld);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
For this example we’re using the Semantic UI¹⁷ CSS Framework. In our template below
when you see classes on the attributes - like class="ui large form segment" - these are
styles coming from Semantic. It’s a great way to have our app look nice without too much
extra markup.

However, if you try to click the vote up or vote down links, you’ll see that the page unexpectedly
reloads.
This is because Javascript, by default, propagates the click event to all the parent components.
Because the click event is propagated to parents, our browser is trying to follow the empty link.
To fix that, we need to make the click event handler to return false. This will ensure the browser
won’t try to refresh the page. We change our code like so:

1 voteUp(): boolean {
2 this.votes += 1;
3 return false;
4 }
5
6 voteDown(): boolean {
7 this.votes -= 1;
8 return false;
9 }
*/
/*
 First, we define a new Component with @Component. The selector says that this component is
placed on the page by using the tag <reddit-article> (i.e. the selector is a tag name).
 In Angular 2, a component host is the element this component is attached to. You’ll notice on our
@Component we’re passing the option: host: { class: 'row' }. This tells Angular that on the host
element (the reddit-article tag) we want to set the class attribute to have “row”.
 We specify these columns with the CSS classes four wide column and twelve wide column
respectively.
We’re showing votes and the title with the template expansion strings {{ votes }} and {{ title}}.
 The values come from the value of votes and title property of the ArticleComponent class.
 Notice that we can use template strings in attribute values, as in the href of the a tag: href="{{link }}".

input property:
<reddit-article [article]="myArticle"></reddit-article>
Notice the syntax here: we put the name of the input in brackets as in: [article] and the value of
the attribute is what we want to pass in to that input.
Then, and this is important, the this.article on the ArticleComponent instance will be set to
myArticle. You can think of it like myArticle is being passed as a parameter (i.e. input) to your
component (via inputs).
Notice that inputs is an Array. This is because you can specify that a component has many inputs.

 */
var ArticleComponent = (function () {
    function ArticleComponent() {
    }
    //  constructor() {  Dont need constructor because of inputs property
    /*
    The problem here is that we’ve hard coded a particular Article in the constructor. The point of
making components is not only encapsulation, but also reusability.
What we would really like to do is to configure the Article we want to display. If, for instance,
we had two articles, article1 and article2, we would like to be able to reuse the reddit-article
component by passing an Article as a “parameter” to the component like this:

    <reddit-article [article]="article1"></reddit-article>
    <reddit-article [article]="article2"></reddit-article>

Angular allows us to do this by using the inputs option of Component:
    */
    //Dont need this anymore
    //this.article = new Article('Angular 2', 'http://angular.io', 10);
    //    }
    ArticleComponent.prototype.voteUp = function () {
        /*
        voteUp and voteDown current break the Law of Demeter¹⁹ which says that a given object
should assume as little as possible about the structure or properties any other objects.
One way to detect this is to be suspicious when you see long method/property chains like
foo.bar.baz.bam. This pattern of long-method chaining is also affectionately referred to
as a “train-wreck”

        To fix that, let’s add voteUp and voteDown methods on the Article class.

Checkout our ArticleComponent component definition now: it’s so short! We’ve moved a
lot of logic out of our component and into our models. The corresponding MVC guideline
here might be Fat Models, Skinny Controllers²⁰. The idea is that we want to move most of
our domain logic to our models so that our components do the minimum work possible.
        */
        //   this.article.votes += 1;
        this.article.voteUp();
        return false;
    };
    ArticleComponent.prototype.voteDown = function () {
        //     this.article.votes -= 1;
        this.article.voteDown();
        return false;
    };
    ArticleComponent = __decorate([
        core_1.Component({
            selector: 'reddit-article',
            inputs: ['article'],
            host: {
                class: 'row'
            },
            template: "\n <div class=\"four wide column center aligned votes\">\n <div class=\"ui statistic\">\n <div class=\"value\">\n {{ article.votes }}\n </div>\n <div class=\"label\">\n Points\n </div>\n </div>\n </div>\n <div class=\"twelve wide column\">\n <a class=\"ui large header\" href=\"{{ article.link }}\">\n {{ article.title }}\n </a>\n<div class = \"meta\">({{article.domain() }})</div>\n <ul class=\"ui big horizontal list voters\">\n <li class=\"item\">\n <a href (click)=\"voteUp()\">\n <i class=\"arrow up icon\"></i>\n upvote\n </a>\n </li>\n <li class=\"item\">\n <a href (click)=\"voteDown()\">\n <i class=\"arrow down icon\"></i>\n downvote\n </a>\n </li>\n </ul>\n </div>\n "
        }), 
        __metadata('design:paramtypes', [])
    ], ArticleComponent);
    return ArticleComponent;
}());
/*
    A good practice when writing Angular code is to try to isolate the data structures you are using from
the component code. To do this, let’s create a data structure that represents a single article.
    */
//Note that this is a plain class and not
//a component. In the Model-View-Controller pattern this would be the Model.
var Article = (function () {
    function Article(title, link, votes) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    Article.prototype.voteUp = function () {
        this.votes += 1;
    };
    Article.prototype.voteDown = function () {
        this.votes -= 1;
    };
    Article.prototype.domain = function () {
        try {
            var link = this.link.split('//')[1];
            return link.split('/')[0];
        }
        catch (err) {
            return null;
        }
    };
    return Article;
}());
//we want the RedditApp component to render this new component
//add reddit-article to reddit
/*
in Angular 2 you need explicitly specify which components (and
therefore, which selectors) you want to use.
On the one hand, this requires a little more configuration. On the other hand, it’s great for
building scalable apps because it means you don’t have to share your directive selectors in
a global namespace.

we need to add the
directives property on our RedditApp
*/
var RedditApp = (function () {
    function RedditApp() {
        this.var1 = 'hi';
        this.var2 = 'bye';
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1),
        ];
    }
    RedditApp.prototype.sortedArticles = function () {
        //Lambda notation here
        // return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
        return this.articles.sort(function (a, b) { return b.votes - a.votes; });
    };
    /*
    Notice we’ve made four changes:
    1. Created a button tag in our markup that shows the user where to click
    2. We created a function named addArticle that defines what we want to do when the button is clicked
    3. We added a (click) attribute on the button that says “call the function addArticle when this button is pressed”.
    4. We added the attribute #newtitle and #newlink to the <input> tags

    Binding Inputs to Values
    <input name="title" #newtitle>

    This markup tells Angular to bind this <input> to the variable newtitle. The
    #newtitle syntax is called a resolve. The effect is that this makes the variable newtitle available to
    the expressions within this view.
    newtitle is now an object that represents this input DOM element (specifically, the type is
    HTMLInputElement). Because newtitle is an object, that means we get the value of the input tag
    using newtitle.value.
    Similarly we add #newlink to the other <input> tag, so that we’ll be able to extract the value from
    it as well.
    
    Binding actions to events
    On our button tag we add the attribute (click)
    */
    RedditApp.prototype.addArticle = function (title, link) {
        this.var1 = title.value;
        this.var2 = link.value;
        console.log("Adding article title: " + title.value + " and link: " + link.value);
        this.articles.push(new Article(title.value, link.value, 0));
        title.value = '';
        link.value = '';
    };
    RedditApp = __decorate([
        core_1.Component({
            selector: 'reddit',
            directives: [ArticleComponent],
            template: "\n<form class=\"ui large form segment\">\n <h3 class=\"ui header\">Add a Link</h3>\n\n <div class=\"field\">\n <label for=\"title\">Title:</label>\n <input name=\"title\" #newtitle>\n </div>\n <div class=\"field\">\n <label for=\"link\">Link:</label>\n <input name=\"link\" #newlink>\n </div>\n\n<button (click) = \"addArticle(newtitle, newlink)\" class = \"ui positive right floated button\"> \nSubmit Linkzz\n</button>\n\n </form>\n<br />\n<p> What you entered for title: {{var1}} </p>\n<p> What you entered for link: {{var2}} </p>\n\n<div class = \"ui grid posts\">\n<!--\nSo here we have three variables:\n1. articles which is an Array of Articles, defined on the RedditApp component\n2. foobar which is a single element of articles (an Article), defined by NgFor\n3. article which is the name of the field defined on inputs of the ArticleComponent\n-->\n    <reddit-article \n       *ngFor = \"let foobar of sortedArticles()\"\n        [article]=\"foobar\">\n    </reddit-article>\n</div>\n "
        }), 
        __metadata('design:paramtypes', [])
    ], RedditApp);
    return RedditApp;
}());
//bootstrap(RedditApp);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BUILT in COMPONENTS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
The built-in components are imported and made available to your components automatically,
so you don’t need to inject it as a directive like you would do with your own
components.

The ngIf directive is used when you want to display or hide an element based on a condition. The
condition is determined by the result of the expression that you pass in to the directive.
If the result of the expression returns a false value, the element will be removed from the DOM.
Some examples are:
1 <div *ngIf="false"></div> <!-- never displayed -->
2 <div *ngIf="a > b"></div> <!-- displayed if a is more than b -->
3 <div *ngIf="str == 'yes'"></div> <!-- displayed if str holds the string "yes" -\
4 ->
5 <div *ngIf="myFunc()"></div> <!-- displayed if myFunc returns a true value \
6 -->


1 <div class="container">
2 <div *ngIf="myVar == 'A'">Var is A</div>
3 <div *ngIf="myVar == 'B'">Var is B</div>
4 <div *ngIf="myVar == 'C'">Var is C</div>
5 <div *ngIf="myVar != 'A' && myVar != 'B' && myVar != 'C'">Var is something els\
6 e</div>
7 </div>

The last case, we are just trying to express else but it gets complicated. Better to use switch.

If you’re familiar with the switch statement then you’ll feel very at home.
The idea behind this directive is the same: allow a single evaluation of an expression, and then
display nested elements based on the value that resulted from that evaluation.
Once we have the result then we can:
• Describe the known results, using the ngSwitchWhen directive
• Handle all the other unknown cases with ngSwitchDefault

Rewrite:
1 <div class="container" [ngSwitch]="myVar">
2 <div *ngSwitchWhen="'A'">Var is A</div>
3 <div *ngSwitchWhen="'B'">Var is B</div>
4 <div *ngSwitchWhen="'C'">Var is C</div>
5 <div *ngSwitchDefault>Var is something else</div>
6 </div>

*/
var SwitchUp = (function () {
    function SwitchUp() {
        this.choiceNum = 4;
    }
    SwitchUp.prototype.nextChoice = function () {
        this.choiceNum += 1;
        if (this.choiceNum === 5) {
            this.choiceNum = 0;
        }
    };
    SwitchUp = __decorate([
        core_1.Component({
            selector: 'switch-app',
            template: "\n<h4 class = \"ui horizontal divider header\">\nCurrent Choice is {{choice}}\n</h4>\n\n<div class = \"ui raised segment\">\n    <ul [ngSwitch] = \"choice\">\n        <li *ngSwitchWhen = \"1\">First Choice</li>\n        <li *ngSwitchWhen = \"2\">Second Choice</li>\n        <li *ngSwitchWhen = \"3\">Third Choice</li>\n        <li *ngSwitchWhen = \"4\">Fourth Chocie</li>\n        <li *ngSwitchWhen = \"2\">Second Choice Again </li>\n        <li *ngSwitchDefault>Default Choice</li>\n    </ul>\n</div>\n\n<div style = \"margin-top: 20px;\">\n    <button class = \"ui primary button\" (click) = \"nextChoice()\">\n    Next Choice\n</button>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], SwitchUp);
    return SwitchUp;
}());
//bootstrap(SwitchUp);
//NgStyle//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
With the NgStyle directive, you can set a given DOM element CSS properties from Angular
expressions.
The simplest way to use this directive is by doing [style.<cssproperty>]="value".

11 <div [style.background-color]="'yellow'">
12 Uses fixed yellow background
13 </div>

Another way to set fixed values is by using the NgStyle attribute and using key value pairs for each
property you want to set, like this:
code/built_in_components/ng_style/app.ts

19 <div [ngStyle]="{color: 'white', 'background-color': 'blue'}">
20 Uses fixed white text on blue background
21 </div>

Notice that in the ng-style specification we have single quotes around background-color
but not around color. Why is that? Well, the argument to ng-style is a Javascript object and
color is a valid key, without quotes. With background-color, however, the dash character
isn’t allowed in an object key, unless it’s a string so we have to quote it.

But the real power of the NgStyle directive comes with using dynamic values.

In our example, we are defining two input boxes:
62 <div class="ui input">
63 <input type="text" name="color" value="{{color}}" #colorinput>
64 </div>
65
66 <div class="ui input">
67 <input type="text" name="fontSize" value="{{fontSize}}" #fontinput>
68 </div>

And then using their values to set the CSS properties for three elements.
27 <div>
28 <span [ngStyle]="{color: 'red'}" [style.font-size.px]="fontSize">
29 red text
30 </span>
31 </div>

It’s important to note that we have to specify units where appropriate. For instance, it isn’t valid
CSS to set a font-size of 12 - we have to specify a unit such as 12px or 1.2em. Angular provides a
handy syntax for specifying units: here we used the notation [style.fontSize.px].
The .px suffix indicates that we’re setting the font-size property value in pixels. You could easily
replace that by [style.fontSize.em] to express the font size in ems or even in percentage using
[style.fontSize.%].

The other two elements use the #colorinput to set the text and background colors:

39 <h4 class="ui horizontal divider header">
40 ngStyle with object property from variable
41 </h4>
42
43 <div>
44 <span [ngStyle]="{color: colorinput.value}">
45 {{ colorinput.value }} text
46 </span>
47 </div>
48
49 <h4 class="ui horizontal divider header">
50 style from variable
51 </h4>
52
53 <div [style.background-color]="colorinput.value"
54 style="color: white;">
55 {{ colorinput.value }} background
56 </div>

This way, when we click the Apply settings button, we call a method that sets the new values:

97 apply(color, fontSize) {
98 this.color = color;
99 this.fontSize = fontSize;
100 }
*/
//NgClass////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
The NgClass directive, represented by a ngClass attribute in your HTML template, allows you to
dynamically set and change the CSS classes for a given DOM element.

The first way to use this directive is by passing in an object literal. The object is expected to have
the keys as the class names and the values should be a truthy/falsy value to indicate whether the
class should be applied or not.

Let’s assume we have a CSS class

14 .bordered {
15 border: 1px dashed black;
16 background-color: #eee;
17 }

Let’s add two div elements: one always having the bordered class (and therefore always having the
border) and another one never having it:
7 <div [ngClass]="{bordered: false}">This is never bordered</div>
8 <div [ngClass]="{bordered: true}">This is always bordered</div>

To make it dynamic we add a variable as the value for the object value, like this:

10 <div [ngClass]="{bordered: isBordered}">
11 Using object literal. Border {{ isBordered ? "ON" : "OFF" }}
12 </div>

Alternatively, we can define the object in our component:

58 toggleBorder() {
59 this.isBordered = !this.isBordered;
60 this.classesObj = {
61 bordered: this.isBordered
62 };
63 }

And use the object directly:

14 <div [ngClass]="classesObj">
15 Using object var. Border {{ classesObj.bordered ? "ON" : "OFF" }}
16 </div>

Again, be careful when you have class names that contains dashes, like bordered-box.
JavaScript objects don’t allow literal keys to have dashes. If you need to use them, you
must make the key a string like this:
1 <div [ng-class]="{'bordered-box': false}">...</div>

We can also use a list of class names to specify which class names should be added to the element.

36 <div class="base" [ngClass]="['blue', 'round']">
37 This will always have a blue background and
38 round corners
39 </div>

Or declare an array variable in our component and pass it in:

1 this.classList = ['blue', 'round'];

41 <div class="base" [ngClass]="classList">
42 This is {{ classList.indexOf('blue') > -1 ? "" : "NOT" }} blue
43 and {{ classList.indexOf('round') > -1 ? "" : "NOT" }} round
44 </div>

*/
var ToggleButton = (function () {
    function ToggleButton() {
        this.isOn = false;
        this.isDisabled = false;
    }
    ToggleButton.prototype.toggle = function (newState) {
        if (!this.isDisabled) {
            this.isOn = newState;
        }
    };
    ToggleButton = __decorate([
        core_1.Component({
            selector: 'toggle-button',
            inputs: ['isDisabled'],
            template: "\n     <div class=\"button\" [ngClass]=\"{active: isOn, disabled: isDisabled}\"\n         (click)=\"toggle(!isOn)\">\n         Click me!\n     </div>",
            styles: ["\n    .button {\n      width: 120px;\n      border: medium solid black;\n    }\n    .active {\n      background-color: red;\n   }\n    .disabled {\n      color: gray;\n      border: medium solid gray;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], ToggleButton);
    return ToggleButton;
}());
//bootstrap(ToggleButton);
//ngFor///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
NgFor
The role of this directive is to repeat a given DOM element (or a collection of DOM elements),
each time passing it a different value from an array.

1 this.cities = ['Miami', 'Sao Paulo', 'New York'];

7 <h4 class="ui horizontal divider header">
8 Simple list of strings
9 </h4>
10
11 <div class="ui list" *ngFor="let c of cities">
12 <div class="item">{{ c }}</div>
13 </div>

Another example:

71 this.people = [
72 { name: 'Anderson', age: 35, city: 'Sao Paulo' },
73 { name: 'John', age: 12, city: 'Miami' },
74 { name: 'Peter', age: 22, city: 'New York' }
75 ];

15 <h4 class="ui horizontal divider header">
16 List of objects
17 </h4>
18
19 <table class="ui celled table">
20 <thead>
21 <tr>
22 <th>Name</th>
23 <th>Age</th>
24 <th>City</th>
25 </tr>
26 </thead>
27 <tr *ngFor="let p of people">
28 <td>{{ p.name }}</td>
29 <td>{{ p.age }}</td>
30 <td>{{ p.city }}</td>
31 </tr>
32 </table>

//Another Example

76 this.peopleByCity = [
77 {
78 city: 'Miami',
79 people: [
80 { name: 'John', age: 12 },
81 { name: 'Angel', age: 22 }
82 ]
83 },
84 {
85 city: 'Sao Paulo',
86 people: [
87 { name: 'Anderson', age: 35 },
88 { name: 'Felipe', age: 36 }
89 ]
90 }
91 ];
92 };

34 <h4 class="ui horizontal divider header">
35 Nested data
36 </h4>
37
38 <div *ngFor="let item of peopleByCity">
39 <h2 class="ui header">{{ item.city }}</h2>
40
41 <table class="ui celled table">
42 <thead>
43 <tr>
44 <th>Name</th>
45 <th>Age</th>
46 </tr>
47 </thead>
48 <tr *ngFor="let p of item.people">
49 <td>{{ p.name }}</td>
50 <td>{{ p.age }}</td>
51 </tr>
52 </table>
53 </div>

Another Example:

59 <div class="ui list" *ngFor="let c of cities; let num = index">
60 <div class="item">{{ num+1 }} - {{ c }}</div>
61 </div>

*/
//NgNonBindable///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
We use ngNonBindable when we want tell Angular not to compile or bind a particular section of
our page.
Let’s say we want to render the literal text {{ content }} in our template. Normally that text will
be bound to the value of the content variable because we’re using the {{ }} template syntax.
So how can we render the exact text {{ content }}? We use the ngNonBindable directive.

7 <div>
8 <span class="bordered">{{ content }}</span>
9 <span class="pre" ngNonBindable>
10 &larr; This is what {{ content }} rendered
11 </span>
12 </div>
And with that ngNonBindable attribute, ng2 will not compile within that second span’s context,
leaving it intact.

*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Forms /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
While we often get events from
clicking on links or moving the mouse, it’s through forms where we get the majority of our rich data
input from users

• Form inputs are meant to modify data, both on the page and the server
• Changes often need to be reflected elsewhere on the page
• Users have a lot of leeway in what they enter, so you need to validate values
• The UI needs to clearly state expectations and errors, if any
• Dependent fields can have complex logic
• We want to be able to test our forms, without relying on DOM selectors

• Controls encapsulate the inputs in our forms and give us objects to work with them
• Validators give us the ability to validate inputs, any way we’d like
• Observers let us watch our form for changes and respond accordingly

The two fundamental objects in ng2 forms are Control and ControlGroup

A Control represents a single input field - it is the smallest unit of an Angular form.
Controls encapsulate the field’s value, and states such as if it is valid, dirty (changed), or has errors.

1 // create a new Control with the value "Nate"
2 let nameControl = new Control("Nate");
3
4 let name = nameControl.value; // -> Nate
5
6 // now we can query this control for certain values:
7 nameControl.errors // -> StringMap<string, any> of errors
8 nameControl.dirty // -> false
9 nameControl.valid // -> true
10 // etc.

Like many things in Angular, we have a class (Control, in this case) that we attach to the DOM with
an attribute (ngControl, in this case). For instance, we might have the following in our form:
1 <!-- part of some bigger form -->
2 <input type="text" ngControl="name" />

Most forms have more than one field, so we need a way to manage multiple Controls. If we wanted
to check the validity of our form, it’s cumbersome to iterate over an array of Controls and check
each Control for validity. ControlGroups solve this issue by providing a wrapper interface around
a collection of Controls.

1 let personInfo = new ControlGroup({
2 firstName: new Control("Nate"),
3 lastName: new Control("Murray"),
4 zip: new Control("90210")
5 })

ControlGroup and Control have a common ancestor (AbstractControl³³). That means we can check
the status or value of personInfo just as easily as a single Control:

1 personInfo.value; // -> {
2 // firstName: "Nate",
3 // lastName: "Murray",
4 // zip: "90210"
5 // }
6
7 // now we can query this control group for certain values, which have sensible
8 // values depending on the children Control's values:
9 personInfo.errors // -> StringMap<string, any> of errors
10 personInfo.dirty // -> false
11 personInfo.valid // -> true
12 // etc.

*/
var DemoFormSku = (function () {
    function DemoFormSku() {
    }
    DemoFormSku.prototype.onSubmit = function (form) {
        console.log('you submitted value:', form);
    };
    DemoFormSku = __decorate([
        core_1.Component({
            selector: 'demo-form-sku',
            /*
            FORM_DIRECTIVES is
            a constant that Angular provides for us as a shorthand to several directives that are all useful in a
            form. FORM_DIRECTIVES includes:
            • ngControl
            • ngControlGroup
            • ngForm
            • ngModel
            */
            directives: [common_1.FORM_DIRECTIVES],
            template: "\n<div class = \"ui raised segment\">\n<h2 class = \"ui header\">Demo Form: Sku</h2>\n<form #f = \"ngForm\"\n            (ngSubmit) = \"onSubmit(f.value)\"\n            class = \"ui form\">\n\n<div class = \"field\">\n    <label for = \"skuInput\">SKU</label>\n    <input type = \"text\" id = \"skuInput\" placeholder = \"SKU\" ngControl = \"sku\">\n</div>\n\n<button type = \"submit\" class = \"ui button\">Submit</button>\n</form>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], DemoFormSku);
    return DemoFormSku;
}());
exports.DemoFormSku = DemoFormSku;
//bootstrap(DemoFormSku);
////////////////////////////////////////Using form builder
/*
We want to change our <form> to use myForm. If you recall, in the last section we said that ngForm
is applied for us automatically when we used FORM_DIRECTIVES. We also mentioned that ngForm
creates its own ControlGroup. Well, in this case, we don’t want to use an outside ControlGroup.
Instead we want to use our instance variable myForm, which we created with our FormBuilder. How
can we do that?
Angular provides another directive that we use when we have an existing ControlGroup: it’s called
NgFormModel

Remember how earlier we said that when using FORM_DIRECTIVES that NgForm will be
automatically applied to a <form> element? There is an exception: NgForm won’t be applied
to a <form> that has ngFormModel.

There’s one last thing we need to do to make this work: bind our Control to the input tag. Remember
that ngControl creates a new Control object, and attaches it to the parent ControlGroup. But in
this case, we used FormBuilder to create our own Controls.
When we want to bind an existing Control to an input we use NgFormControl:

    Remember:
To create a new ControlGroup and Controls implicitly use:
• ngForm and
• ngControl
But to bind to an existing ControlGroup and Controls use:
• ngFormModel and
• ngFormControl

//////////////////////////////////////Form validation

Because we didn’t expose the sku Control as an instance variable, we now need a way to get a
reference to it. There are two ways we can get at it:
1. via myForm.find
2. via the ngFormControl directive
ControlGroup has a .find method which allows you to look up a child Control by path

The form export from NgFormControl
There is another way we can get a reference to the Control and that is via the ngForm export of
the NgFormControl directive. This is a new concept that we haven’t covered so far:
Components can export a reference themselves so that you can use them in the view.
(We’ll cover how to use exportAs in the Components chapter, but for now, just know that many of
the built-in components do this already.)
In this case, NgFormControl exports itself as ngForm. You can use this export by using the #reference
syntax. Here’s what it looks like:

23 <input type="text"
24 id="skuInput"
25 placeholder="SKU"
26 #sku="ngForm"
27 [ngFormControl]="myForm.controls['sku']">

What this does is make the NgFormControl directive itself available in the view as the variable sku.
But note this is the directive and not the Control. To access the sku Control we must now call
sku.control.Now that we have sku available to us, we can check the validity and errors like so:\

28 <div *ngIf="!sku.control.valid"
29 class="ui error message">SKU is invalid</div>
30 <div *ngIf="sku.control.hasError('required')"
31 class="ui error message">SKU is required</div>

When we create a local reference using the #reference syntax, it is only available to sibling and
children elements, not parents.
For instance, we can’t do this
1 // this won't work
2 <div class="field"
3 [class.error]="!sku.control.valid && sku.control.touched">
Why not? Because this <div class="field" is a parent of the input element that declares the
reference.
    */
var DemoFormSkuBuilder = (function () {
    function DemoFormSkuBuilder(fb) {
        this.myForm = fb.group({
            'sku': ['ABC123', common_1.Validators.required]
        });
        //During injection an instance of FormBuilder will be created and we assign it to the fb variable
        /*
        There are two main functions we’ll use on FormBuilder:
        • control - creates a new Control
        • group - creates a new ControlGroup

myForm is typed to be a ControlGroup. We create a ControlGroup by calling fb.group(). .group
takes an object of key-value pairs that specify the Controls in this group.
In this case, we’re setting up one control sku, and the value is ["ABC123"] - this says that the default
value of this control is "ABC123". (You’ll notice that is an array. That’s because we’ll be adding more
configuration options there later.)
Now that we have myForm we need to use that in the view (i.e. we need to bind it to our form
element).

        */
    }
    DemoFormSkuBuilder.prototype.onSubmit = function (value) {
        console.log('you submitted value:', value.sku);
    };
    DemoFormSkuBuilder = __decorate([
        core_1.Component({
            selector: 'demo-form-sku-builder',
            directives: [common_1.FORM_DIRECTIVES],
            template: "\n <div class=\"ui raised segment\">\n <h2 class=\"ui header\">Demo Form: Sku with Builder</h2>\n <form [ngFormModel]=\"myForm\"\n (ngSubmit)=\"onSubmit(myForm.value)\"\n class=\"ui form\">\n\n <div class=\"field\"\n    [class.error] = \"!myForm.find('sku').valid && myForm.find('sku').touched\">\n <label for=\"skuInput\">SKU</label>\n <input type=\"text\"\n        id=\"skuInput\"\n        placeholder=\"SKU\"\n        #sku = \"ngForm\"\n        [ngFormControl]=\"myForm.controls['sku']\">\n         <div *ngIf=\"!sku.control.valid\"\n            class=\"ui error message\">SKU is invalid</div>\n         <div *ngIf=\"sku.control.hasError('required')\"\n            class=\"ui error message\">SKU is required</div>\n       </div>\n\n<div *ngIf = \"!myForm.valid\"\n    class = \"ui error message\"> Form is invalid </div>\n\n <button type=\"submit\" class=\"ui button\">Submit</button>\n</form>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], DemoFormSkuBuilder);
    return DemoFormSkuBuilder;
}());
exports.DemoFormSkuBuilder = DemoFormSkuBuilder;
////////////Custom Validationszzz/////////////////////////////////////////////////
/*

To see how validators are implemented, let’s look at Validators.required from the Angular core
source:
1 export class Validators {
2 static required(c: Control): StringMap<string, boolean> {
3 return isBlank(c.value) || c.value == "" ? {"required": true} : null;
4 }
A validator: - Takes a Control as its input and - Returns a StringMap<string, boolean> where the
key is “error code” and the value is true if it fails

Let’s say we have specific requirements for our sku. For example, say our sku needs to begin with
123.
21 function skuValidator(control: Control): { [s: string]: boolean } {
22 if (!control.value.match(/^123/)) {
23 return {invalidSku: true};
24 }
25 }
This validator will return an error code invalidSku if the input (the control.value) does not begin
with 123.

How can we add multiple validators to a single field?
For that, we use Validators.compose:
64 this.myForm = fb.group({
65 'sku': ['', Validators.compose([
66 Validators.required, skuValidator])]
67 });
Validators.compose wraps our two validators and lets us assign them both to the Control. The
Control is not valid unless both validations are valid.

*/
function skuValidator(control) {
    if (!control.value.match(/^123/)) {
        return { invalidSku: true };
    }
}
var DemoFormWithValidationsExplicit = (function () {
    function DemoFormWithValidationsExplicit(fb) {
        this.myForm = fb.group({
            //  'sku': ['', Validators.required]
            'sku': ['', common_1.Validators.compose([common_1.Validators.required, skuValidator])],
            'productName': ['', common_1.Validators.required]
        });
        this.sku = this.myForm.controls['sku'];
        /*
        Both ControlGroup and Control have an EventEmitter that we can use to observe changes.
        EventEmitter is an Observable, which means it conforms to a defined specification for
        watching for changes.

        To watch for changes on a control we:
        1. get access to the EventEmitter by calling control.valueChanges. Then we
        2. add an observer using the .observer method

        Here we’re observing two separate events: changes on the sku field and changes on the form as a whole.
        The observable that we pass in is an object with a single key: next (there are other keys you can
        pass in, but we’re not going to worry about those now). next is the function we want to call with
        the new value whenever the value changes.
        */
        this.sku.valueChanges.subscribe(function (value) { console.log('sku has changed to: ', value); });
        this.myForm.valueChanges.subscribe(function (form) {
            console.log('form has changed to:', form);
        });
    }
    DemoFormWithValidationsExplicit.prototype.onSubmit = function (value) {
        console.log('you submitted value: ', value);
    };
    DemoFormWithValidationsExplicit = __decorate([
        core_1.Component({
            selector: 'demo-form-with-validations-explicit',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            template: "\n  <div class=\"ui raised segment\">\n    <h2 class=\"ui header\">Demo Form: with validations (explicit)</h2>\n    <form [ngFormModel]=\"myForm\"\n          (ngSubmit)=\"onSubmit(myForm.value)\"\n          class=\"ui form\">\n\n      <div class=\"field\"\n          [class.error]=\"!sku.valid && sku.touched\">\n        <label for=\"skuInput\">SKU</label>\n\n        <input type=\"text\"\n               id=\"skuInput\"\n               placeholder=\"SKU\"\n               [ngFormControl]=\"sku\">\n\n        <input type = \"text\"\n               id = \"productNameInput\"  \n               placeholder = \"product Name\"\n               [ngFormControl] = \"myForm.find('productName')\"\n               [(ngModel)] = \"productName\"> <!-- NgModel for 2 way data binding. -->\n        \n        <div class = \"ui info message\">\n            The product name is: {{productName}}\n        </div>\n\n         <div *ngIf=\"!sku.valid\"\n           class=\"ui error message\">SKU is invalid</div>\n         <div *ngIf=\"sku.hasError('required')\"\n           class=\"ui error message\">SKU is required</div>\n         <div *ngIf = \"sku.hasError('invalidSku')\"\n            class = \"ui error message\"><tt>123</tt></div>\n      </div>\n\n      <div *ngIf=\"!myForm.valid\"\n        class=\"ui error message\">Form is invalid</div>\n\n      <button type=\"submit\" class=\"ui button\">Submit</button>\n    </form>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], DemoFormWithValidationsExplicit);
    return DemoFormWithValidationsExplicit;
}());
exports.DemoFormWithValidationsExplicit = DemoFormWithValidationsExplicit;
var Formzz = (function () {
    function Formzz() {
    }
    Formzz = __decorate([
        core_1.Component({
            selector: 'forms',
            directives: [DemoFormSkuBuilder, DemoFormSku, DemoFormWithValidationsExplicit],
            template: "\n    <demo-form-sku></demo-form-sku>\n    <demo-form-sku-builder></demo-form-sku-builder>\n    <demo-form-with-validations-explicit></demo-form-with-validations-explicit>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Formzz);
    return Formzz;
}());
exports.Formzz = Formzz;
//bootstrap(Formzz);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RXJS TUTORIAL/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Obeservables - 
//And observable helps handle asynchronous data in applications, more advanced promises, promise can handle one event, and return its success or error, 
//whereas an observable can handle multiple events over a given period of time
var App = (function () {
    //Observables are cancellable. Once a promise has been fired off, that promise cant be cancelled it has to return a value back
    //Lets try to cancel out stream1$
    function App() {
        this.clock = Observable_1.Observable.interval(1000); //Interval of 1 second
        //The observable we get back is an object, that object pushes out values asynchronously
        //We have a pipe called async that can handle that <h1>{{clock | async}} </h1>
        //async in the template is basically doing a subscribe on the observable and rendering out the value
        this.promise = new Promise(function (resolve) {
            setTimeout(function () {
                resolve('promise timeout');
            }, 2000);
        });
        //Now lets do it with observables!
        //Observables kinda like streams of events, end with $ for name to let reader know its an observable
        this.stream1$ = new Observable_1.Observable(function (observer) {
            var timeout = setTimeout(function () {
                observer.next('observable timeout');
            }, 2000);
            return function () {
                clearTimeout(timeout);
            }; //This function is called whenever the observable is unsubscribed. Once all the subsribers unsubscribe from it  
            //allows us to clean up after it.      
        });
        //Think of observables of an array of values over time
        this.stream$ = new Observable_1.Observable(function (observer) {
            var count = 0;
            var interval = setInterval(function () { return observer.next(count++); }, 1000); //calls its every one second
            return function () {
                clearInterval(interval); //cleans up and ends interval once everyone unsubscribes from it
            };
        });
        this.clock.subscribe(console.log.bind(console));
        //Here the subscribe is logging out the value
        this.promise.then(function (value) { return console.log(value); }); //logs it after 2 seconds just once
        var disposable = this.stream1$.subscribe(function (value) { return console.log(value); }); //logs it after 2 seconds just once same as the promise functionality
        //subscribe registers handlers for handling emitted values, errors, and completitions from the observable and executes
        //the observable's subscriber function which will take action to set up the underlying data stream 
        //when we subsribe we get a disposable back, disposable is what lets us unsubscribe
        setTimeout(function () {
            disposable.unsubscribe(); //but we are gunna unsubsribe after one second
        }, 1000); //Our observable was cancelled before it was able to emit that next value
        // this.stream$.subscribe(value => { console.log(value) }); //we can use array like functions on these observables
        //In the library rxjs, implements a bunch of utility functions called operators
        //Lets filter on our observable
        //this.stream$.filter((value:number) => value % 2 === 0) //We want to filter out any values emitted that are odd and only want even values
        //    .subscribe(value => console.log(value));
        //-1-2-3-4-5-6------> On our observable we emitted a new value every second
        //   filter, then we call filter operator
        //---2---4---6----> that filter filterd out values
        this.stream$.map(function (value) { return value * value; })
            .subscribe(function (value) { return console.log(value); });
        //-1-2-3-4-5-6------> On our observable we emitted a new value every second
        //   map
        //-1-4-9-16-25-36
        //Observables allow you to handle multiple values at a time, we can stream that into our application
        //Use operators to filter and manipulate values as they come into stream
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n<h1>{{clock | async}} </h1>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//bootstrap(App);
var App2 = (function () {
    function App2(_formBuilder, _http) {
        var _this = this;
        this._formBuilder = _formBuilder;
        this._http = _http;
        var API_URL = 'https://www.googleapis.com/youtube/v3/search';
        var API_KEY = 'AIzaSyCBxyaaqD1NpiS-cSVuh2LdontkFHi-Ty4';
        this.searchForm = this._formBuilder.group({
            'search': ['', common_1.Validators.required]
        });
        //this.results$ = this.searchForm.controls.search.valueChanges
        //    .subscribe(value => console.log(value)); //As you type new values are emitted through the observable. 
        //We dont want to subscribe to this, we really want to call our api.
        //We need to call switch map
        //  this.results$ = this.searchForm.controls.search.valueChanges
        //      .switchMap(query => this._http.get(`${API_URL}?q=${query}&key=${API_KEY}&part=snippet`)
        //When we call angular http service, this will return an observable, so by the end of this operator, we will have is an observable of observables
        //we want to flatten this out as we go along
        //switchMap will map through all the requests, if a request value is emitted from our observable, it will cancel out previous observables,
        //as the user types, adn we hit the api and call out for xhr calls, everytime a new value is emit, this will automatically cancel the previous value
        //great for freeing up resources
        //         .map(res => res.json()) //We want the json out of it
        //          .map(res => res.items);//and then we want the list of items
        this.results$ = this.searchForm.controls.search.valueChanges // <- Observable Form
            .debounceTime(500) //delays or debounces our observable from emitting the value, we are gunna wait 500 ms before emitting to switch map
            .switchMap(function (query) { return _this._http.get(API_URL + "?q=" + query + "&key=" + API_KEY + "&part=snippet"); }) // <-- Observable Http
            .map(function (res) { return res.json(); })
            .map(function (res) { return res.items; });
    }
    App2 = __decorate([
        core_1.Component({
            selector: 'app2',
            template: "\n<h3>Angular 2 Observables Demo</h3>\n\n<form [ngFormModel]=\"searchForm\">\n    <label for=\"search\">Search YouTube</label><br />\n    <input ngControl=\"search\" id=\"search\" />\n</form>\n\n<div *ngFor=\"#result of results$ | async\"> <!-- Observable templates/pipes -->\n<!-- The property results$ in our component is an observable and we can bind out templates\n     directly to an observable using new async pipe, and this is neat\n     and then once template  is done, component is destroyed, and clean up observable -->\n  <a href=\"https://www.youtube.com/watch?v={{result.id.videoId}}\" target=\"_blank\">\n    <h3>{{result.snippet.title}}</h3>\n  </a>\n  <p>{{result.snippet.description}}</p>\n  <img [src]=\"result.snippet.thumbnails.default.url\" style=\"width: 100%; max-width: 250px;\" />\n</div>\n\n\n    "
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http])
    ], App2);
    return App2;
}());
exports.App2 = App2;
//bootstrap(App2, [FORM_PROVIDERS, HTTP_PROVIDERS]);
///////////////////////////////////////////////////////////////
//HTTP//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/*
Angular comes with its own HTTP library which we can use to call out to external APIs.
When we make calls to an external server, we want our user to continue to be able to interact with
the page. That is, we don’t want our page to freeze until the HTTP request returns from the external
server. To achieve this effect, our HTTP requests are asynchronous.

In Javascript, there are generally three approaches to dealing with async code:
1. Callbacks
2. Promises
3. Observables
*/
//The first thing we’re going to do is make a simple GET request to the jsonplaceholder API⁶⁶.
var SimpleHttpComponent = (function () {
    function SimpleHttpComponent(http) {
        this.http = http;
        /*
        Remember that when we use the public keyword in public http: Http TypeScript will
        assign http to this.http. It’s a shorthand for:
        */
        this.http = http;
    }
    //Now let’s make our first HTTP request by implementing the makeRequest function:
    /*
    To make an HTTP request is straightforward: we call this.http.request and pass the URL to which
    we want to make a GET request.
    http.request returns an Observable. We can subscribe to changes (akin to using then from a
    Promise) using subscribe.

    When our http.request returns (from the server) the stream will emit a Response object. We extract
    the body of the response as an Object by using json and then we set this.data to that Object.
    Since we have a response, we’re not loading anymore so we set this.loading = false

    .subscribe can also handle failures and stream completion by passing a function to the
    second and third arguments respectively. In a production app it would be a good idea to
    handle those cases, too. That is, this.loading should also be set to false if the request
    fails (i.e. the stream emits an error).
    */
    SimpleHttpComponent.prototype.makeRequest = function () {
        var _this = this;
        this.loading = true;
        this.http.request('http://jsonplaceholder.typicode.com/posts/1') //Returns an Observable<Response>
            .subscribe(function (res) {
            _this.data = res.json();
            _this.loading = false;
        });
    };
    SimpleHttpComponent = __decorate([
        core_1.Component({
            selector: 'simple-http',
            template: "\n    <h2> Basic Request </h2>\n    <button type = \"button\" (click) = \"makeRequest()\">Make Request</button>\n    <div *ngIf = \"loading\">...</div>\n    <pre> {{data|json}} </pre>\n<!--The data is an Object. A great way to debug objects is to use the json pipe as we do here. We\u2019ve\nput this in a pre tag to give us nice, easy to read formatting.-->\n    "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SimpleHttpComponent);
    return SimpleHttpComponent;
}());
exports.SimpleHttpComponent = SimpleHttpComponent;
//bootstrap(SimpleHttpComponent, [HTTP_PROVIDERS]);
/*
Of course, all of the HTTP requests we’ve made so far have simply been GET requests. It’s important
that we know how we can make other requests too.
Making a POST request
Making POST request with @angular/http is very much like making a GET request except that we
have one additional parameter: a body.
*/
var MoreHTTPRequests = (function () {
    function MoreHTTPRequests(http) {
        this.http = http;
    }
    MoreHTTPRequests.prototype.makePost = function () {
        var _this = this;
        /*
        Notice in the second argument we’re taking an Object and converting it to a JSON string using
JSON.stringify.
        */
        this.loading = true;
        this.http.post('http://jsonplaceholder.typicode.com/posts', JSON.stringify({
            body: 'bar',
            title: 'foo',
            userId: 1
        }))
            .subscribe(function (res) {
            _this.data = res.json();
            _this.loading = false;
        });
    };
    /*
    There are a few other fairly common HTTP requests and we call them in much the same way.
• http.put and http.patch map to PUT and PATCH respectively and both take a URL and a body
• http.delete and http.head map to DELETE and HEAD respectively and both take a URL (no
body)
    */
    MoreHTTPRequests.prototype.makeDelete = function () {
        var _this = this;
        this.loading = true;
        this.http.delete('http://jsonplaceholder.typicode.com/posts/1')
            .subscribe(function (res) {
            _this.data = res.json();
            _this.loading = false;
        });
    };
    /*

All of the http methods we’ve covered so far also take an optional last argument: RequestOptions.
The RequestOptions object encapsulates:
• method
• headers
• body
• mode
• credentials
• cache
• url
• search
    
    Let’s say we want to craft a GET request that uses a special X-API-TOKEN header. We can create a
request with this header like so:
    */
    MoreHTTPRequests.prototype.makeHeaders = function () {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('X-API-TOKEN', 'ng-book');
        var opts = new http_1.RequestOptions();
        opts.headers = headers;
        this.http.get('http://jsonplaceholder.typicode.com/posts/1', opts)
            .subscribe(function (res) {
            _this.data = res.json();
        });
    };
    MoreHTTPRequests = __decorate([
        core_1.Component({
            selector: 'more-http',
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [common_1.JsonPipe],
            template: "\n  <h2>More Requests</h2>\n  <button type=\"button\" (click)=\"makePost()\">Make Post</button>\n  <button type=\"button\" (click)=\"makeDelete()\">Make Delete</button>\n  <button type=\"button\" (click)=\"makeHeaders()\">Make Headers</button>\n  <div *ngIf=\"loading\">loading...</div>\n  <pre>{{data | json}}</pre>\n"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MoreHTTPRequests);
    return MoreHTTPRequests;
}());
exports.MoreHTTPRequests = MoreHTTPRequests;
//bootstrap(MoreHTTPRequests, [HTTP_PROVIDERS]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////Routing///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
The initial root URL could be represented by http://our-app/. When we visit this page, we could
be redirected to our “home” route at http://our-app/home.
When accessing the ‘About Us’ area, the URL could become http://our-app/about. This way if we
sent the URL http://our-app/about to another user they would see same page.

In Angular we configure routes by mapping paths to the component that will handle them.
Let’s create a small app that has multiple routes. On this sample application we will have 3 routes:
• A main page route, using the /#/home path;
• An about page, using the /#/about path;
• A contact us page, using the /#/contact path;
And when the user visits the root path (/#/), it will redirect to the home path.

There are three main components that we use to configure routing in Angular:
• RouteConfig annotation describes the routes our application supports
• RouterOutlet is a “placeholder” component that gets expanded to each route’s content
• RouterLink is used to link to routes
*/
/*
Notice a few things about the routes:
• path specifies the URL this route will handle
• name uniquely identifies the route and is used to navigate to it either by using a RouterLink,
a redirectTo or from the Router API
• component is what ties a given route path to a component that will handle the route
• the optional redirectTo is used to redirect a given path to an existing route

In our sample code above, if we visit the root path at http://localhost:8080/#/⁷⁶, we’ll be redirected
to the default route Home.
In this case, if we visit the URL http://localhost:8080/#/contactus⁷⁷, we’ll see that the browser
redirects to /contact.

We might try linking to the routes directly using pure HTML:
1 <a href="/#/home">Home</a>
But if we do this, we’ll notice that clicking the link triggers a page reload and that’s definitely not
what we want when programming single page apps.
To solve this problem, Angular 2 provides a solution that can be used to link to routes with no page
reload: the RouterLink directive.
This directive allows you to write links using a special syntax:

For instance, if we have a route with a path of /hello and our base element declares href="/app",
the application will use /app/# as the concrete path.
Sometimes though, coders of an Angular application don’t have access to the head section of the
application HTML. This is true for instance, when reusing headers and footers of a larger, preexisting
application.
Fortunately there is a workaround for this cases. You can declare the application base path
programmatically, when bootstrapping the Angular application:
1 bootstrap(RoutesDemoApp, [
2 ROUTER_PROVIDERS,
3 provide(APP_BASE_HREF, {useValue: '/'})
4 ]);
Injecting the result from provide(APP_BASE_HREF, {useValue: '/'}) is the equivalent of using
<base href="/"> on our application HTML header.

*/
var ContactComponent = (function () {
    function ContactComponent() {
    }
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact',
            template: "<h1>Contact Us</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            template: "<h1>Welcome!</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'about',
            template: "<h1>About</h1>"
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
var RoutesDemoApp = (function () {
    function RoutesDemoApp() {
    }
    RoutesDemoApp = __decorate([
        core_1.Component({
            selector: 'router-app',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            /*
            In order to describe to Angular where in our page we want to render the contents for each route,
        we use the RouterOutlet directive.
            For this component, we’re going to use two router directives: RouterOutlet and the RouterLink.
        Those directives, along with all other common router directives are declared on a special array called
        ROUTER_DIRECTIVES. When we import that constant on our directives area, it’s basically importing
        all of those directives for us, without the need to do it one by one.
            */
            template: "\n  <div>\n    <nav>\n      <a>Navigation:</a>\n      <ul>\n        <li><a [routerLink]=\"['/Home']\">Home</a></li>\n        <li><a [routerLink]=\"['/About']\">About</a></li>\n        <li><a [routerLink]=\"['/Contact']\">Contact us</a></li>\n      </ul>\n    </nav>\n\n    <router-outlet></router-outlet>\n  </div>\n  "
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', name: 'root', redirectTo: ['/Home'] },
            { path: '/home', name: 'Home', component: HomeComponent },
            { path: '/about', name: 'About', component: AboutComponent },
            { path: '/contact', name: 'Contact', component: ContactComponent },
            { path: '/contactus', name: 'ContactUs', redirectTo: ['/Contact'] },
        ]), 
        __metadata('design:paramtypes', [])
    ], RoutesDemoApp);
    return RoutesDemoApp;
}());
//bootstrap(RoutesDemoApp, [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })
//]);
/*
The default strategy is PathLocationStrategy, which is what we call HTML5 routing. While using
this strategy, routes are represented by regular paths, like /home or /contact.
We can change the location strategy used for our application by binding the LocationStrategy class
to a new, concrete strategy class.
Instead of using the default PathLocationStrategy we can also use the HashLocationStrategy.
The reason we’re using the hash strategy as a default is because if we were using HTML5 routing,
our URLs would end up being regular paths (that is, not using hash/anchor tags).
This way, the routes would work when you click a link and navigate on the client side, let’s say from
/about to /contact.

If we were to refresh the page, instead of asking the server for the root URL, which is what is being
served, instead we’d be asking for /about or /contact. Because there’s no known page at /about
the server would return a 404.
This default strategy works with hash based paths, like /#/home or /#/contact that the server
understands as being the / path.

Finally, in order to make our example application work with this new strategy, first we have to
import LocationStrategy and HashLocationStrategy:
and then just add that link to the bootstrap section

55 bootstrap(RoutesDemoApp, [
56 ROUTER_PROVIDERS,
57 provide(LocationStrategy, {useClass: HashLocationStrategy})
58 ]);
*/
/*To add a parameter to our router configuration, we specify the route path like this:

46 @RouteConfig([
47 { path: '/', name: 'root', redirectTo: ['Search'] },
48 { path: '/search', name: 'Search', component: SearchComponent },
49 { path: '/artists/:id', name: 'Artists', component: ArtistComponent },
50 { path: '/tracks/:id', name: 'Tracks', component: TrackComponent },
51 { path: '/albums/:id', name: 'Albums', component: AlbumComponent },
52 ])

When we visit the route /artist/123, the 123 part will be passed as the id route parameter to our
route.
But how can we retrieve the parameter for a given route? That’s where we use route parameters.
In order to use route parameters, we need to first import RouteParams:
1 import {RouteParams} from "@angular/router-deprecated";

Next, we inject the RouteParams into the constructor.
1 export class ArticleComponent {
2 id: string;
3
4 constructor(private routeParams: RouteParams) {
5 this.id = routeParams.get("id");
6 }
7 }

*/ 
//# sourceMappingURL=app.js.map