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


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/