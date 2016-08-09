import { Component, Input } from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { QuestionBase }     from './question-base';

@Component({
    selector: 'df-question',
    /*
    <!--
    Notice this component can present any type of question in our model. We only have two types of questions at this point
    but we can imagine many more. The ngSwitch determines which type of question to display.
    In both components we're relying on Angular's ngFormModel to connect the template HTML to the underlying control objects,
    populated from the question model with display and validation rules.

    What is the attr.for you may ask?
    We can set the value of an attribute directly with an attribute binding.
    We have stressed throughout this chapter that setting an element property with a property binding is always
    preferred to setting the attribute with a string. Why does Angular offer attribute bindin
    We must use attribute binding when there is no element property to bind.
    As the message says, the <td> element does not have a colspan property.
    It has the "colspan" attribute, but interpolation and property binding can set only properties, not attributes.
    We need attribute bindings to create and bind to such attributes.
    Attribute binding syntax resembles property binding. Instead of an element property between brackets, we start with the prefix attr,
    followed by a dot (.) and the name of the attribute. We then set the attribute value, using an expression that resolves to a string.
    label for attribute => for element_id	Specifies which form element a label is bound to
-->
    */
  template: `
<div [formGroup]="form">
  <label [attr.for]="question.key">{{question.label}}</label>

  <div [ngSwitch]="question.controlType">

    <input *ngSwitchCase="'textbox'" [formControlName]="question.key"
            [id]="question.key" [type]="question.type">

    <select [id]="question.key" *ngSwitchCase="'dropdown'" [formControlName]="question.key">
      <option *ngFor="let opt of question.options" [value]="opt.key">{{opt.value}}</option>
    </select>

  </div> 

  <div class="errorMessage" *ngIf="!isValid">{{question.label}} is required</div>
</div>
`,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}

