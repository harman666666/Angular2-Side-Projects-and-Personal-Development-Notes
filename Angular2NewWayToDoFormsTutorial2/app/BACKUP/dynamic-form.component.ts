import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { QuestionBase }                 from './question-base';
import { QuestionControlService }       from './question-control.service';

@Component({
    selector: 'dynamic-form',
    /*
    <!--
It presents a list of questions, each question bound to a <df-question> component element. The <df-question> tag matches
    the DynamicFormQuestionComponent, the component responsible for rendering the details of each individual question based
    on values in the data-bound question object.
-->
    */
  template: `
<div>
  <form (ngSubmit)="onSubmit()" [formGroup]="form">

    <div *ngFor="let question of questions" class="form-row">
      <df-question [question]="question" [form]="form"></df-question>
    </div>

    <div class="form-row">
      <button type="submit" [disabled]="!form.valid">Save</button>
    </div>
  </form>

  <div *ngIf="payLoad" class="form-row">
    <strong>Saved the following values</strong><br>{{payLoad}}
  </div>
</div>`,
  directives: [DynamicFormQuestionComponent, REACTIVE_FORM_DIRECTIVES],
  providers:  [QuestionControlService]
})
    //DynamicFormComponent is the entry point and the main container for the form.
//DynamicFormComponent expects the list of questions in the form of an array bound to @Input() questions.
//The set of questions we have defined for the job application is returned 
//from the QuestionService.In a real app we'd retrieve these questions from storage.
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}


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
