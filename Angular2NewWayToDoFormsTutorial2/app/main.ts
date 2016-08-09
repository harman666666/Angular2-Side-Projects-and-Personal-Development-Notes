import { bootstrap }                            from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms,  } from '@angular/forms';
import {Component} from "@angular/core";
import { AppComponent } from './app.component';

import {
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    FormBuilder,
    FormGroup,
    AbstractControl,
    Validators,
    FormControl
} from '@angular/forms';

//bootstrap(AppComponent, [disableDeprecatedForms(),provideForms()]).catch((err: any) => console.error(err));


///////////////////////////////////////////////////////////////////////////////
//Full Form Tutorial Here:///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/*
The two fundamental objects in ng2 forms are FormControl and FormGroup.
A FormControl represents a single input field - it is the smallest unit of an Angular form.
FormControls encapsulate the field's value, and states such as if it is valid, dirty (changed), or has errors.

// create a new FormControl with the value "Nate"
let nameControl = new FormControl("Nate");
let name = nameControl.value; // -> Nate
// now we can query this control for certain values:
nameControl.errors // -> StringMap<string, any> of errors
nameControl.dirty  // -> false
nameControl.valid  // -> true
// etc.

To build up forms we create FormControls (and groups of FormControls) and then attach metadata and logic to them.
Like many things in Angular, we have a class (FormControl, in this case) that we attach to the DOM with an attribute (formControl, in this case). 
For instance, we might have the following in our form:
<!-- part of some bigger form -->
<input type="text" [formControl]="name" />
This will create a new FormControl object within the context of our form. 


Most forms have more than one field, so we need a way to manage multiple FormControls. If we wanted to check the validity of our form, 
it's cumbersome to iterate over an array of FormControls and check each FormControl for validity. FormGroups solve this issue by 
providing a wrapper interface around a collection of FormControls.
Here's how you create a FormGroup:

let personInfo = new FormGroup({
    firstName: new FormControl("Nate"),
    lastName: new FormControl("Murray"),
    zip: new FormControl("90210")
})


FormGroup and FormControl have a common ancestor (AbstractControl). That means we can check the status or value of personInfo just 
as easily as a single FormControl:

personInfo.value; // -> {
//   firstName: "Nate",
//   lastName: "Murray",
//   zip: "90210"
// }
// now we can query this control group for certain values, which have sensible
// values depending on the children FormControl&apos;s values:
personInfo.errors // -> StringMap<string, any> of errors
personInfo.dirty  // -> false
personInfo.valid  // -> true

Notice that when we tried to get the value from the FormGroup we received an object with key-value pairs. 
This is a really handy way to get the full set of values from our form without having to iterate over each 
FormControl individually.


In order to use the new forms library we need to first make sure we bootstrap our app to use the forms library. 
To do this, we do the following in our app.ts where we bootstrap the app: => provideForms()
This ensures that we're able to use a set of directives named FORM_DIRECTIVES in our views. FORM_DIRECTIVES is a constant that Angular provides for us as a shorthand
to several directives that are all useful in a form. FORM_DIRECTIVES includes:

formControl
ngFormGroup
ngForm
ngModel

NgForm does something handy but non-obvious: it includes the form tag in its selector (instead of requiring you to explicitly add ngForm as an attribute). 
What this means is that if you inject FORM_DIRECTIVES, NgForm will get automatically attached to any <form> tags you have in your view. 
This is really useful but potentially confusing because it happens behind the scenes.
*/

@Component({  
  selector: 'fun',
/*
    And what type of object is ngForm? It is a FormGroup. That means we can use f as a FormGroup in our view.
    And that's exactly what we do in the (ngSubmit) output.
    (ngSubmit) - comes from NgForm
    f.value - f is the FormGroup that we specified above. And .value will return the key/value pairs of this FormGroup

The NgModel directive specifies a selector of ngModel. This means we can attach it to our input tag by
adding this sort of attribute: ngModel="whatever". In this case, we specify ngModel with no attribute value.
There are a couple of different ways to specify ngModel in your templates and this is the first.
When we us ngModel with no attribute value we are specifying:
a one-way data binding
we want to create a FormControl on this form with the name sku (because of the name attribute on the input tag)
NgModel creates a new FormControl that is automatically added to the parent FormGroup (in this case, on the form)
and then binds a DOM element to that new FormControl. That is, it sets up an association between the input tag in our view and the
FormControl and the association is matched by a name, in this case "sku".

NgModel vs. ngModel: what's the difference? Generally, when we use PascalCase, like NgModel, we're specifying the class and
referring to the object as it's defined in code. The lower case (CamelCase), as in ngModel, comes from the selector of the directive
and it's only used in the DOM / template.
It's also worth pointing out that NgModel and FormControl are separate objects. NgModel is the directive that you use in your view, whereas
FormControl is the object used for representing the data and validations in your form.


    */
  template: `  
  <div class="ui raised segment">  
    <h2 class="ui header">Demo Form: Sku</h2>  
    <form #f="ngForm"  
          (ngSubmit)="onSubmit(f.value)"  
          class="ui form">

      <div class="field">  
        <label for="skuInput">SKU</label>  
        <input type="text"  
               id="skuInput"  
               placeholder="SKU"  
               name="sku" ngModel>  
      </div>

      <button type="submit" class="ui button">Submit</button>  
    </form>  
  </div>  
  `
})
export class DemoFormSku {
    onSubmit(form: any): void {
        console.log('you submitted value:', form);
    }
}


 //bootstrap(DemoFormSku, [  provideForms()  ]).catch((err: any) => console.error(err));

/*
FormBuilder is an aptly-named helper class that helps us build forms. As you recall,
forms are made up of FormControls and FormGroups and the FormBuilder helps us make them
(you can think of it as a "factory" object).

For this component we're going to be using the formGroup and formControl directives which means we
need to import REACTIVE_FORM_DIRECTIVES like so:

During injection an instance of FormBuilder will be created and
we assign it to the fb variable (in the constructor).
There are two main functions we'll use on FormBuilder:
control - creates a new FormControl
group - creates a new FormGroup

myForm is typed to be a FormGroup. We create a FormGroup by calling fb.group(). .group takes an object of key-value
pairs that specify the FormControls in this group.

In this case, we're setting up one control sku, and the value is ["ABC123"] - this says that the default
value of this control is "ABC123". (You'll notice that is an array. That's because we'll be adding more
configuration options there later.)

Now that we have myForm we need to use that in the view (i.e. we need to bind it to our form element).
We want to change our <form> to use myForm. If you recall, in the last section we said that ngForm
is applied for us automatically when we used FORM_DIRECTIVES. We also mentioned that ngForm
creates its own FormGroup. Well, in this case, we don't want to use an outside FormGroup.
Instead we want to use our instance variable myForm, which we created with our FormBuilder. How can we do that?
Angular provides another directive that we use when we have an existing FormGroup: it's called formGroup
and we use it like this:

    <h2 class="ui header">Demo Form: Sku with Builder</h2>
    <form [formGroup]="myForm"

Here we're telling Angular that we want to use myForm as the FormGroup for this form.
Remember how earlier we said that when using FORM_DIRECTIVES that NgForm will be automatically
applied to a <form> element? There is an exception: NgForm won't be applied to a <form> that has formGroup.
If you're curious, the selector for NgForm is:
form:not([ngNoForm]):not([formGroup]),ngForm,[ngForm]
This means you could have a form that doesn't get NgForm applied by using the ngNoForm attribute.

We also need to change onSubmit to use myForm instead of f, because now it is myForm that has ourconfiguration and values.
There's one last thing we need to do to make this work: bind our FormControl to the input tag.
Remember that ngControl creates a new FormControl object, and attaches it to the parent FormGroup.
But in this case, we used FormBuilder to create our own FormControls.
When we want to bind an existing FormControl to an input we use formControl:
*/

@Component({
    selector: 'demo-form-sku-builder',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `  
  <div class="ui raised segment">  
    <h2 class="ui header">Demo Form: Sku with Builder</h2>  
    <form [formGroup]="myForm"  
          (ngSubmit)="onSubmit(myForm.value)"  
          class="ui form">
 
      <div class="field">  
        <label for="skuInput">SKU</label>  
        <input type="text"  
               id="skuInput"  
               placeholder="SKU"  
               [formControl]="myForm.controls['sku']">  
      </div>
 
    <button type="submit" class="ui button">Submit</button>  
    </form>  
  </div>  
  `
})

export class DemoFormSkuBuilder {
    myForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['ABC123']
        });
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
 }

/*
To create a new FormGroup and FormControls implicitly use:
ngForm and
ngModel

But to bind to an existing FormGroup and FormControls use:
formGroup and
formControl
////////////////////////////////////////////////////////////////////////////////
Adding Validations

If someone enters data in the wrong format, we want to give them feedback and not allow the form to be submitted.
For this we use validators.
Validators are provided by the Validators module and the simplest validator is Validators.required which simply says
that the designated field is required or else the FormControl will be considered invalid.
To use validators we need to do two things:

Assign a validator to the FormControl object
Check the status of the validator in the view and take action accordingly
To assign a validator to a FormControl object we simply pass it as the second argument to our FormControl constructor:

let control = new FormControl('sku', Validators.required);
let control = new FormControl('sku', Validators.required);

Or in our case, because we're using FormBuilder we will use the following syntax:

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku':  ['', Validators.required]

Now we need to use our validation in the view. There are two ways we can access the validation value in the view:

1.We can explicitly assign the FormControl sku to an instance variable of the class -
  which is more verbose, but gives us easy access to the FormControl in the view.
2.We can lookup the FormControl sku from myForm in the view. This requires less work in the component
  definition class, but is slightly more verbose in the view.

First Way:
*/


export class DemoFormWithValidationsExplicitTutorial {
    /*
    Notice that:
We setup sku: AbstractControl at the top of the class and
    We assign this.sku after we've created myForm with the FormBuilder
    This is great because it means we can reference sku anywhere in our component view.
    The downside is that by doing it this way, we'd have to setup an instance variable for
    every field in our form. For large forms, this can get pretty verbose.
    */

    myForm: FormGroup;
    sku: AbstractControl;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['', Validators.required]
        });

        this.sku = this.myForm.controls['sku'];
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
}
/*
Now that we have our sku being validated, I want to look at four different ways we can use it in our view:
Checking the validity of our whole form and displaying a message
Checking the validity of our individual field and displaying a message
Checking the validity of our individual field and coloring the field red if it's invalid
Checking the validity of our individual field on a particular requirement and displaying a message

We can check the validity of our whole form by looking at myForm.valid:
<div *ngIf="!myForm.valid"

We can also display a message for the specific field if that field's FormControl is invalid:
               [formControl]="sku">
         <div *ngIf="!sku.valid"

I'm using the Semantic UI CSS Framework's CSS class .error, which means if I add the class error to the <div class= "field">
it will show the input tag with a red border. To do this, we can use the property syntax to set conditional classes:
      <div class="field"
          [class.error]="!sku.valid && sku.touched">

To look up a specific validation failure we use the hasError method:
           class="ui error message">SKU is invalid</div>
         <div *ngIf="sku.hasError('required')"

Note that hasError is defined on both FormControl and FormGroup. This means you can pass a second argument of path
to lookup a specific field from FormGroup. For example, we could have written the previous example as:
     <div *ngIf="myForm.hasError('required', 'sku')"
       class="error">SKU is required</div>
*/

@Component({
    selector: 'demo-form-with-validations-explicit',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: `  
  <div class="ui raised segment">  
    <h2 class="ui header">Demo Form: with validations (explicit)</h2>  
    <form [formGroup]="myForm"  
          (ngSubmit)="onSubmit(myForm.value)"  
          class="ui form">
 
      <div class="field"  
          [class.error]="!sku.valid && sku.touched">  
        <label for="skuInput">SKU</label>  
        <input type="text"  
               id="skuInput"  
               placeholder="SKU"  
               [formControl]="sku">  
         <div *ngIf="!sku.valid"  
           class="ui error message">SKU is invalid</div>  
         <div *ngIf="sku.hasError('required')"  
           class="ui error message">SKU is required</div>  
      </div>
 
      <div *ngIf="!myForm.valid"  
        class="ui error message">Form is invalid</div>
 
      <button type="submit" class="ui button">Submit</button>  
    </form>  
  </div>  
  `
})
export class DemoFormWithValidationsExplicit {
    myForm: FormGroup;
    sku: AbstractControl;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['', Validators.required]
        });

        this.sku = this.myForm.controls['sku'];
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
}

bootstrap(DemoFormWithValidationsExplicit, [
    provideForms()
])
    .catch((err: any) => console.error(err));

/*
NOT USING AN INSTANCE VARIABLE
We often wont want to create an instance variable for each AbstractControl, so how would we reference this FormControl
in our view without an instance variable?
Instead we can use the myForm.controls property as in:

      <input type="text"
             id="skuInput"
             placeholder="SKU"
             [formControl]="myForm.controls['sku']">
       <div *ngIf="!myForm.controls['sku'].valid"
         class="ui error message">SKU is invalid</div>
       <div *ngIf="myForm.controls['sku'].hasError('required')"
         class="ui error message">SKU is required</div>
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CUSTOM VALIDATORS

We often are going to want to write our own custom validations. Let's take a look at how to do that.
let's look at Validators.required from the Angular core source

export class Validators {
  static required(c: FormControl): StringMap<string, boolean> {
    return isBlank(c.value) || c.value == "" ? {"required": true} : null;
  }

A validator:
- Takes a FormControl as its input and
- Returns a StringMap<string, boolean> where the key is "error code" and the value is true if it fails

Let's say we have specific requirements for our sku. For example, say our sku needs to begin with 123.
We could write a validator like so:
*/

function skuValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match(/^123/)) {
        return { invalidSku: true };
    }
}

/*
This validator will return an error code invalidSku if the input (the control.value) does not begin with 123.
Now we need to add the validator to our FormControl. However, there's one small problem: we already have a validator on sku.
How can we add multiple validators to a single field?

For that, we use Validators.compose:

    this.myForm = fb.group({
      'sku':  ['', Validators.compose([
        Validators.required, skuValidator])]
    });
The FormControl is not valid unless both validations are valid.
Now we can use our new validator in the view:
         <div *ngIf="sku.hasError('invalidSku')"
           class="ui error message">SKU must begin with <tt>123</tt></div>
////////////////////////////////////////////////////////////////////////////////////////////////////////////
WATCHING FOR CHANGES
we want to watch for any value changes on a control.
Both FormGroup and FormControl have an EventEmitter that we can use to observe changes.

To watch for changes on a control we:
get access to the EventEmitter by calling control.valueChanges. Then we
add an observer using the .observer method

    this.myForm = fb.group({
      'sku':  ['', Validators.required]
    });

    this.sku = this.myForm.controls['sku'];

    this.sku.valueChanges.subscribe(
      (value: string) => {
        console.log('sku changed to:', value);
      }
    );

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to:', form);
      }
    );

The observable that we pass in is an object with a single key: next (there are other keys you can pass in, but
we're not going to worry about those now). next is the function we want to call with the new value whenever
the value changes. If we type 'kj' into the text box we will see in our console:

sku changed to:  k
form changed to:  Object {sku: "k"}
sku changed to:  kj
form changed to:  Object {sku: "kj"}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
NGMODEL
NgModel is a special directive: it binds a model to a form.

Let's change our form a little bit and say we want to input productName. We're going to
use ngModel to keep the component instance variable in sync with the view.
*/

export class DemoFormNgModel {
    myForm: FormGroup;
    productName: string;

    constructor(fb: FormBuilder) {
        this.myForm = fb.group({
            'productName': ['', Validators.required]
        });
    }
    
    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
}
/*
Next, let's use ngModel on our input tag:
        <input type="text"
               id="productNameInput"
               placeholder="Product Name"
               [formControl]="myForm.find('productName')"
               [(ngModel)]="productName">


Notice something else here: we're still using formControl to specify that this input should be
bound to the FormControl on our form. We do this because ngModel is only binding the input
to the instance variable - the FormControl is completely separate. But because we still want
to validate this value and submit it as part of the form, we keep the formControl directive.
*/