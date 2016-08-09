/*
Each components is composed of three parts:
� Component Decorator
� A View
� A Controller

*/
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
var core_1 = require("@angular/core");
var ProductImage = (function () {
    function ProductImage() {
    }
    ProductImage = __decorate([
        core_1.Component({
            selector: 'product-image',
            host: { class: 'ui small image' },
            inputs: ['product'],
            //The one thing to note here is in the img tag, notice how we use the [src] input to img.
            /*
            Dont do it this way: <img src="{{ product.imageUrl }}">
        
            Why is that wrong? Well, because in the case where your browser loads that template before Angular
            has run, your browser will try to load the image with the literal string {{ product.imageUrl }} and
            then it will get a 404 not found, which can show a broken image on your page until Angular runs.
            By using the [src] attribute, we�re telling Angular that we want to use the [src] input on this img
            tag. Angular will then replace the value of the src attribute once the expression is resolved.
            */
            template: "\n        <img class = \"product-image\" [src] = \"product.imageUrl\" />\n              "
        }), 
        __metadata('design:paramtypes', [])
    ], ProductImage);
    return ProductImage;
}());
var PriceDisplay = (function () {
    function PriceDisplay() {
    }
    PriceDisplay = __decorate([
        core_1.Component({
            selector: 'price-display',
            inputs: ['price'],
            /*
            It�s pretty straightforward, but one thing to note is that we�re escaping the dollar sign $ because this
            is a backtick string and the dollar sign is used for template variables
            */
            template: "\n    <div class = \"price-display\"> ${{ price }} </div>\n              "
        }), 
        __metadata('design:paramtypes', [])
    ], PriceDisplay);
    return PriceDisplay;
}());
var ProductDepartment = (function () {
    function ProductDepartment() {
    }
    ProductDepartment = __decorate([
        core_1.Component({
            selector: 'product-department',
            inputs: ['product'],
            template: "\n    <div class = \"product-department\">\n        <span *ngFor = \"let name of product.department; let i = index\">\n        <a href = \"#\"> {{ name }} </a>\n        <span> {{i < (product.department.length-1) ? '>' : ''}}</span>\n        </span>\n    </div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], ProductDepartment);
    return ProductDepartment;
}());
var ProductRow = (function () {
    function ProductRow() {
    }
    ProductRow = __decorate([
        core_1.Component({
            selector: 'product-row',
            inputs: ['product'],
            /*
            The third option host is a new one. The host option lets us set attributes on the host element. In this
        case, we�re using the Semantic UI item class��. Here when we say host: {'class': 'item'} we�re
        saying that we want to attach the CSS class �item� to the host element.
        
            Using host is nice because it means we can configure our host element from within the
        component. This is great because otherwise we�d require the host element to specify the
        CSS tag and that is bad because we would then make assigning a CSS class part of the
        requirement to using the Component.
        
            */
            host: { 'class': 'item' },
            directives: [ProductImage, ProductDepartment, PriceDisplay],
            template: "\n    <product-image [product] = \"product\"></product-image>\n    <div class = \"content\">\n        <div class = \"header\"> {{product.name}} </div>\n        <div class = \"meta\">\n            <div class = \"product-sku\">SKU #{{product.sku}} </div>\n        </div>\n        <div class = \"description\">\n            <product-department [product] = \"product\"></product-department>\n        </div>\n        </div>\n    <price-display [price] = \"product.price\"> </price-display>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProductRow);
    return ProductRow;
}());
var ProductList = (function () {
    function ProductList() {
        this.onProductSelected = new core_1.EventEmitter();
    }
    ProductList.prototype.clicked = function (product) {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
    };
    ProductList.prototype.isSelected = function (product) {
        if (!product || !this.currentProduct) {
            return false;
        }
        return product.sku === this.currentProduct.sku;
    };
    ProductList = __decorate([
        core_1.Component({
            selector: 'product-list',
            directives: [ProductRow],
            //With the inputs option, we�re specifying the parameters we expect our component to receive. inputs
            //takes an array of strings which specify the input keys.
            inputs: ['productList'],
            outputs: ['onProductSelected'],
            template: "\n    <div class = \"ui items\">\n    <product-row\n        *ngFor = \"let myProduct of productList\"\n        [product] = \"myProduct\"\n        (click) = \"clicked(myProduct)\"\n         [class.selected] = \"isSelected(myProduct)\">\n    </product-row>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ProductList);
    return ProductList;
}());
var InventoryApp = (function () {
    function InventoryApp() {
        /*
Normally, I probably wouldn�t pass more than 5 arguments to a function. Another option
here is to configure the Product class to take an Object in the constructor, then if we
wouldn�t have to remember the order of the arguments. That is, Product could be changed
to do something like this:

new Product({sku: "MYHAT", name: "A green hat"})

But for now, a 5 argument constructor is fine.

The difference is scoping. var is scoped to the nearest function block and let is scoped
to the nearest enclosing block (both are global if outside any block),
which can be smaller than a function block.

        let newProduct = new Product('NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', ['Men', 'Accessories', 'Hats'], 29.99);
        this.products = [newProduct,
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                '/resources/images/products/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'MYSHOES', 'Black Running Shoes',
                '/resources/images/products/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99)
    
        */
        this.products = [
            new Product('MYSHOES', 'Black Running Shoes', '/resources/images/products/black-shoes.jpg', ['Men', 'Shoes', 'Running Shoes'], 109.99),
            new Product('NEATOJACKET', 'Blue Jacket', '/resources/images/products/blue-jacket.jpg', ['Women', 'Apparel', 'Jackets & Vests'], 238.99),
            new Product('NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', ['Men', 'Accessories', 'Hats'], 29.99)
        ];
    }
    InventoryApp.prototype.productWasSelected = function (product) {
        console.log('Product clicked: ', product);
    };
    InventoryApp = __decorate([
        core_1.Component({
            /*
        The selector is a way to define what
        elements in the HTML will match this component. In this case, by saying selector: 'inventoryapp',
        we�re saying that in our HTML we want to match the inventory-app tag, that is, we�re defining
        a new tag that has new functionality whenever we use it. E.g. when we put this in our HTML:
        1 <inventory-app></inventory-app>
        Angular will use the InventoryApp component to implement the functionality.
        Alternatively, with this selector, we can also use a regular div and specify the component as an
        attribute:
        1 <div inventory-app></div>
        */
            selector: 'inventory-app',
            directives: [ProductList],
            //other components we want to be able to use in this view. This option takes an Array of classes.
            /*
        The view is the visual part of the component. By using the template option on @Component, we
        declare the HTML template that the component will have.
        
        What�s neat about template binding is that the code inside the brackets is an expression. That means
        you can do things like this:
        � {{ count + 1 }}
        � {{ myFunction(myArguments) }}
        In the first case, we�re using an operator to change the displayed value of count. In the second
        case, we�re able to replace the tags with the value of the function myFunction(myArguments). Using
        template binding tags is the main way that you�ll show data in your Angular applications.
        */
            template: "\n<div class = \"inventory-app\">\nfook\n<product-list \n    [productList] = \"products\"  \n    (onProductSelected) = \"productWasSelected($event)\">      \n</product-list>\n</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], InventoryApp);
    return InventoryApp;
}());
/*
We�re creating a new Product class and the constructor takes 5 arguments. When we write public
sku: string, we�re saying two things:
� there is a public variable on instances of this class called sku
� sku is of type string.
*/
var Product = (function () {
    function Product(sku, name, imageUrl, department, price) {
        this.sku = sku;
        this.name = name;
        this.imageUrl = imageUrl;
        this.department = department;
        this.price = price;
    }
    return Product;
}());
/*
Say we wanted to add a shopping cart view and then we would add items to our cart.
How could we implement this?
The only tools we�ve talked about are emitting output events. When we click add-to-cart do we
simply bubble up an addedToCart event and handle at the root component? That feels a bit awkward.
How Angular Works 106
Data architecture is a large topic with many opinions. Thankfully, Angular is flexible enough to
handle a wide variety of data architectures, but that means that you have to decide for yourself
which to use.
In Angular 1, the default option was two-way data binding. Two-way data binding is super easy
to get started: your controllers have data, your forms manipulate that data directly, and your views
show the data.
The problem with two-way data binding is that it often causes cascading effects throughout your
application and makes it really difficult to trace data flow as your project grows.
Another problem with two-way data binding is that because you�re passing data down through
components it often forces your �data layout tree� to match your �dom view tree�. In practice, these
two things should really be separate.
One way you might handle this scenario would be to create a ShoppingCartService, which would
be a singleton that would hold the list of the current items in the cart. This service could notify any
interested objects when the items in the cart changes.
The idea is easy enough, but in practice there�s a lot of details to be worked out.
The recommended way in Angular 2, and in many modern web frameworks (such as React) is to
adopt a pattern of one-way data binding. That is, your data flows only down through components.
If you need to make changes, you emit events that cause changes to happen �at the top� which then
trickle down.
One-way data binding can seem like it adds some overhead in the beginning but it saves a lot of
complication around change detection and it makes your systems easier to reason about.
Thankfully there are two major contenders for managing your data architecture:
1. Use an Observables-based architecture like RxJS
2. Use a Flux-based architecture
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Inputs: To use this do: <my-component [name]="myName"[age] = "myAge" > </my-component>.
var myComponent = (function () {
    function myComponent() {
    }
    myComponent = __decorate([
        core_1.Component({
            selector: 'my-component',
            inputs: ['name', 'age']
        }), 
        __metadata('design:paramtypes', [])
    ], myComponent);
    return myComponent;
}());
//Input names that dont match attribute names in html (input names have to match class property names)
//To use this: <my-component [shortName]="myName" [oldAge]="myAge" [country] = "Scotland"></my-component>
var MyComponent2 = (function () {
    function MyComponent2() {
    }
    MyComponent2 = __decorate([
        core_1.Component({
            selector: 'my-component2',
            inputs: ['name : shortName', 'age: oldAge', 'country']
        }), 
        __metadata('design:paramtypes', [])
    ], MyComponent2);
    return MyComponent2;
}());
//Outputs:
//When you want to send data from your component to the outside world, you use output bindings.
/*
Let�s say a component we�re writing has a button and we need to do something when that button
is clicked.
The way to do this is by binding the click output of the button to a method declared on our
component�s controller. You do that using the (output)="action" notation.
*/
var Counter = (function () {
    function Counter() {
    }
    Counter.prototype.increase = function () {
        this.value += 1;
    };
    Counter.prototype.decrease = function () {
        this.value -= 1;
    };
    Counter = __decorate([
        core_1.Component({
            selector: 'counter',
            template: "\n    {{value }}\n    <button (click) = \"increase()\">Increase</button>\n    <button (click) = \"decrease()\">Decrease</button>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Counter);
    return Counter;
}());
/*
In this example, the event is internal to the component. When creating our own components we can
also expose �public events� (component outputs) that allow the component to talk to the outside
world.

Let�s say we want to create a component that emits a custom event, like click or mousedown above.
To create a custom output event we do three things:

1. Specify outputs in the @Component configuration
2. Attach an EventEmitter to the output property
3. Emit an event from the EventEmitter, at the right time

An EventEmitter is simply an object that helps you implement the Observer Pattern��.
That is, it�s an object that can maintain a list of subscribers and publish events to them.
That�s it.
Here�s a short and sweet example of how you can use EventEmitter

1 let ee = new EventEmitter();
2 ee.subscribe((name: string) => console.log("Hello nigga"));
3 ee.emit("Nate");
4
5 // -> "Hello nigga"

When we assign an EventEmitter to an output Angular automatically subscribes for us.
You don�t need to do the subscription yourself (necessarily, though you can add your own
subscriptions if you want to).
*/
var SingleComponent = (function () {
    function SingleComponent() {
        this.putRingOnIt = new core_1.EventEmitter();
    }
    SingleComponent.prototype.liked = function () {
        this.putRingOnIt.emit("oh oh oh");
    };
    SingleComponent = __decorate([
        core_1.Component({
            selector: 'single-component',
            outputs: ['putRingOnIt'],
            template: "\n        <button (click) = \"liked()\"> Liked it? </button>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SingleComponent);
    return SingleComponent;
}());
//If we wanted to use this output in a parent component we could do this: 
var ClubComponent = (function () {
    function ClubComponent() {
    }
    ClubComponent.prototype.ringWasPlaced = function (message) {
        console.log('Put your hands up: ${message}');
    };
    ClubComponent = __decorate([
        core_1.Component({
            selector: 'club',
            template: "\n    < div >\n    <single-component\n        (putRingOnIt) = \"ringWasPlaced($event)\" > </single-component>\n    </div>\n   "
        }), 
        __metadata('design:paramtypes', [])
    ], ClubComponent);
    return ClubComponent;
}());
platform_browser_dynamic_1.bootstrap(InventoryApp);
//# sourceMappingURL=app.js.map