/*
Each components is composed of three parts:
• Component Decorator
• A View
• A Controller

*/

import { bootstrap } from "@angular/platform-browser-dynamic";
import { Component, EventEmitter} from "@angular/core";


@Component({
    selector: 'product-image',
    host: { class: 'ui small image' },
    inputs: ['product'],
    //The one thing to note here is in the img tag, notice how we use the [src] input to img.
    /*
    Dont do it this way: <img src="{{ product.imageUrl }}">

    Why is that wrong? Well, because in the case where your browser loads that template before Angular
    has run, your browser will try to load the image with the literal string {{ product.imageUrl }} and
    then it will get a 404 not found, which can show a broken image on your page until Angular runs.
    By using the [src] attribute, we’re telling Angular that we want to use the [src] input on this img
    tag. Angular will then replace the value of the src attribute once the expression is resolved.
    */

    template: `
        <img class = "product-image" [src] = "product.imageUrl" />
              `
})

class ProductImage {
    product: Product;
}


@Component({
    selector: 'price-display',
    inputs: ['price'],
    /*
    It’s pretty straightforward, but one thing to note is that we’re escaping the dollar sign $ because this
    is a backtick string and the dollar sign is used for template variables
    */
    template: `
    <div class = "price-display"> \${{ price }} </div>
              `
})
class PriceDisplay {
    price: number;
}

@Component({
    selector: 'product-department',
    inputs: ['product'],
    template: `
    <div class = "product-department">
        <span *ngFor = "let name of product.department; let i = index">
        <a href = "#"> {{ name }} </a>
        <span> {{i < (product.department.length-1) ? '>' : ''}}</span>
        </span>
    </div>
`
    /*
    The thing to note about the ProductDepartment Component is the ngFor and the span tag.
    Our ngFor loops over product.department and assigns each department string to name. The new
    part is the second expression that says: #i=index. This is how you get the iteration number out of
    ngFor.
    In the span tag, we use the i variable to determine if we should show the greater-than > symbol.
    The idea is that given a department, we want to show the department string like:
    Women > Apparel > Jackets & Vests
    */
})
class ProductDepartment {
    product: Product;
}


@Component({

    selector: 'product-row',
    inputs: ['product'],
    /*
    The third option host is a new one. The host option lets us set attributes on the host element. In this
case, we’re using the Semantic UI item class³². Here when we say host: {'class': 'item'} we’re
saying that we want to attach the CSS class “item” to the host element.

    Using host is nice because it means we can configure our host element from within the
component. This is great because otherwise we’d require the host element to specify the
CSS tag and that is bad because we would then make assigning a CSS class part of the
requirement to using the Component.

    */
    host: { 'class': 'item' },
    directives: [ProductImage, ProductDepartment, PriceDisplay],
    template:
    `
    <product-image [product] = "product"></product-image>
    <div class = "content">
        <div class = "header"> {{product.name}} </div>
        <div class = "meta">
            <div class = "product-sku">SKU #{{product.sku}} </div>
        </div>
        <div class = "description">
            <product-department [product] = "product"></product-department>
        </div>
        </div>
    <price-display [price] = "product.price"> </price-display>
    `
})

class ProductRow {
    product: Product;
}


@Component({
    selector: 'product-list',
     directives: [ProductRow],
    //With the inputs option, we’re specifying the parameters we expect our component to receive. inputs
    //takes an array of strings which specify the input keys.

    inputs: ['productList'],
    outputs: ['onProductSelected'],
    template:
    `
    <div class = "ui items">
    <product-row
        *ngFor = "let myProduct of productList"
        [product] = "myProduct"
        (click) = "clicked(myProduct)"
         [class.selected] = "isSelected(myProduct)">
    </product-row>
    </div>
    `
    /*
    The line that reads [product]="myProduct" says that we want to pass myProduct (the local variable)
to the input product of the product-row. (We’ll define this input when we define the ProductRow
component below.)
The (click)='clicked(myProduct)' line describes what we want to do when this element is clicked.
click is a built-in event that is triggered when the host element is clicked on. In this case, we want
to call the component function clicked on ProductsList whenever this element is clicked on.
The line [class.selected]="isSelected(myProduct)" is a fun one: Angular allows us to set
classes conditionally on an element using this syntax. This syntax says “add the CSS class selected
    if isSelected(myProduct) returns true.” This is a really handy way for us to mark the currently
selected product.
    */
})

class ProductList {
    productList: Product[];
    onProductSelected: EventEmitter<Product>;

    /*
    currentProduct is a property internal to ProductsList. You might also hear this being referred to
    as “local component state”. It’s only used here within the component.
    */
    currentProduct: Product;

    constructor() {
        this.onProductSelected = new EventEmitter();
    }

    clicked(product: Product): void {
        this.currentProduct = product;
        this.onProductSelected.emit(product);
    }

    isSelected(product: Product): boolean {
        if (!product || !this.currentProduct) {
            return false;
        }
        return product.sku === this.currentProduct.sku;
    }

}

@Component({//The @Component decorator is where you configure your component.
    /*
The selector is a way to define what
elements in the HTML will match this component. In this case, by saying selector: 'inventoryapp',
we’re saying that in our HTML we want to match the inventory-app tag, that is, we’re defining
a new tag that has new functionality whenever we use it. E.g. when we put this in our HTML:
1 <inventory-app></inventory-app>
Angular will use the InventoryApp component to implement the functionality.
Alternatively, with this selector, we can also use a regular div and specify the component as an
attribute:
1 <div inventory-app></div>
*/
    selector: 'inventory-app', 
    directives: [ProductList], //Notice that we’ve added the directives option to our @Component configuration. This specifies the
                              //other components we want to be able to use in this view. This option takes an Array of classes.

    /*
The view is the visual part of the component. By using the template option on @Component, we
declare the HTML template that the component will have.

What’s neat about template binding is that the code inside the brackets is an expression. That means
you can do things like this:
• {{ count + 1 }}
• {{ myFunction(myArguments) }}
In the first case, we’re using an operator to change the displayed value of count. In the second
case, we’re able to replace the tags with the value of the function myFunction(myArguments). Using
template binding tags is the main way that you’ll show data in your Angular applications.
*/
    template: 
    `
<div class = "inventory-app">
fook
<product-list 
    [productList] = "products"  
    (onProductSelected) = "productWasSelected($event)">      
</product-list>
</div>
    `  
/*
The [squareBrackets] pass inputs and the (parenthesis) handle outputs.
Data flows in to your component via input bindings and events flow out of your component through
output bindings.
Think of the set of input + output bindings as defining the public API of your component.

In Angular, you pass data into child components via inputs.
<products-list [productList]="products"

The left-hand side [productList] says we want to use the productList input of the products-list
component
The right-hand side "products" says we want to send the value of the expression products. That is,
the array this.products in the InventoryApp class.

You might ask, “how would I know that productList is a valid input to the products-list
component? The answer is: you’d read the docs for that component. The inputs (and
outputs) are part of the “public API” of a component.
You’d know the inputs for a component that you’re using in the same way that you’d know
what the arguments are for a function that you’re using.

Ouput: 
<products-list ...
 (onProductSelected)="productWasSelected($event)">

• (onProductSelected), the left-hand side is the name of the output we want to “listen” on
• "productWasSelected", the right-hand side is the function we want to call when something
new is on this output
• $event is a special variable here that represents the thing emitted on the output.

    */
})

class InventoryApp{
    products: Product[];

    constructor() {

        /*
Normally, I probably wouldn’t pass more than 5 arguments to a function. Another option
here is to configure the Product class to take an Object in the constructor, then if we
wouldn’t have to remember the order of the arguments. That is, Product could be changed
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
            new Product(
                'MYSHOES', 'Black Running Shoes',
                '/resources/images/products/black-shoes.jpg',
                ['Men', 'Shoes', 'Running Shoes'],
                109.99),
            new Product(
                'NEATOJACKET', 'Blue Jacket',
                '/resources/images/products/blue-jacket.jpg',
                ['Women', 'Apparel', 'Jackets & Vests'],
                238.99),
            new Product(
                'NICEHAT', 'A Nice Black Hat',
                '/resources/images/products/black-hat.jpg',
                ['Men', 'Accessories', 'Hats'],
                29.99)
        ];

    }



    productWasSelected(product: Product): void {
        console.log('Product clicked: ', product);
    }

}


/*
We’re creating a new Product class and the constructor takes 5 arguments. When we write public
sku: string, we’re saying two things:
• there is a public variable on instances of this class called sku
• sku is of type string.
*/
class Product {
    constructor(
        public sku: string,
        public name: string,
        public imageUrl: string,
        public department: string[],
        public price: number)
    { }
}







/*
Say we wanted to add a shopping cart view and then we would add items to our cart.
How could we implement this?
The only tools we’ve talked about are emitting output events. When we click add-to-cart do we
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
Another problem with two-way data binding is that because you’re passing data down through
components it often forces your “data layout tree” to match your “dom view tree”. In practice, these
two things should really be separate.
One way you might handle this scenario would be to create a ShoppingCartService, which would
be a singleton that would hold the list of the current items in the cart. This service could notify any
interested objects when the items in the cart changes.
The idea is easy enough, but in practice there’s a lot of details to be worked out.
The recommended way in Angular 2, and in many modern web frameworks (such as React) is to
adopt a pattern of one-way data binding. That is, your data flows only down through components.
If you need to make changes, you emit events that cause changes to happen “at the top” which then
trickle down.
One-way data binding can seem like it adds some overhead in the beginning but it saves a lot of
complication around change detection and it makes your systems easier to reason about.
Thankfully there are two major contenders for managing your data architecture:
1. Use an Observables-based architecture like RxJS
2. Use a Flux-based architecture
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Inputs: To use this do: <my-component [name]="myName"[age] = "myAge" > </my-component>.
@Component({
    selector: 'my-component',
    inputs: ['name', 'age']
})
class myComponent {
    public name: string;
    private age: number;
}

//Input names that dont match attribute names in html (input names have to match class property names)
//To use this: <my-component [shortName]="myName" [oldAge]="myAge" [country] = "Scotland"></my-component>
@Component({
    selector: 'my-component2',
    inputs: ['name : shortName', 'age: oldAge', 'country']
    /*
    • The key (name, age and country) represent how that incoming property will be visible
(“bound”) in the controller.
• The value (shortName, oldAge, country) configures how the property is visible to the outside
world.
    */

})
class MyComponent2{
    name: string;
    age: number;
}

//Outputs:
//When you want to send data from your component to the outside world, you use output bindings.
/*
Let’s say a component we’re writing has a button and we need to do something when that button
is clicked.
The way to do this is by binding the click output of the button to a method declared on our
component’s controller. You do that using the (output)="action" notation.
*/

@Component({
    selector: 'counter',
    template:
    `
    {{value }}
    <button (click) = "increase()">Increase</button>
    <button (click) = "decrease()">Decrease</button>
    `
})
class Counter{
value: number;

increase(){
this.value +=1;
}

decrease(){
this.value -=1;
}

}
/*
In this example, the event is internal to the component. When creating our own components we can
also expose “public events” (component outputs) that allow the component to talk to the outside
world.

Let’s say we want to create a component that emits a custom event, like click or mousedown above.
To create a custom output event we do three things:

1. Specify outputs in the @Component configuration
2. Attach an EventEmitter to the output property
3. Emit an event from the EventEmitter, at the right time

An EventEmitter is simply an object that helps you implement the Observer Pattern³¹.
That is, it’s an object that can maintain a list of subscribers and publish events to them.
That’s it.
Here’s a short and sweet example of how you can use EventEmitter

1 let ee = new EventEmitter();
2 ee.subscribe((name: string) => console.log("Hello nigga"));
3 ee.emit("Nate");
4
5 // -> "Hello nigga"

When we assign an EventEmitter to an output Angular automatically subscribes for us.
You don’t need to do the subscription yourself (necessarily, though you can add your own
subscriptions if you want to).
*/

@Component({
    selector: 'single-component',
    outputs: ['putRingOnIt'],
    template: 
    `
        <button (click) = "liked()"> Liked it? </button>
    `
})

class SingleComponent{
    putRingOnIt: EventEmitter<string>;

    constructor(){
    this.putRingOnIt = new EventEmitter();
    }
    liked(): void{
    this.putRingOnIt.emit("oh oh oh");
    }
}

//If we wanted to use this output in a parent component we could do this: 

@Component({
    selector: 'club',
    template: `
    < div >
    <single-component
        (putRingOnIt) = "ringWasPlaced($event)" > </single-component>
    </div>
   `
 })

class ClubComponent{
ringWasPlaced(message: string){
console.log('Put your hands up: ${message}');
    }
}

bootstrap(InventoryApp);