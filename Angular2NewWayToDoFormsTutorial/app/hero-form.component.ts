import { Component } from '@angular/core';
import { NgForm }    from '@angular/common';

import { Hero }    from './hero';

@Component({
  selector: 'hero-form',
  templateUrl: 'app/hero-form.component.html'
})
export class HeroFormComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

 //Start by wrapping the form in a <div> and bind its hidden property to the HeroFormComponent.submitted property.
 //The main form is visible from the start because the the submitted property is false until we submit the form, 
//as this fragment from the HeroFormComponent reminds us:
    //When we click the Submit button, the submitted flag becomes true and the form disappears as planned.
    //  <div  [hidden]="submitted">
  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }



  // Reset the form with a new hero AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  newHero() {
    this.model = new Hero(42, '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
      /*
      Run the application again, click the New Hero button, and the form clears. The required bars to the left of the input box are red,
      indicating invalid name and power properties.
      That's understandable as these are required fields. The error messages are
      hidden because the form is pristine; we haven't changed anything yet.
      Enter a name and click New Hero again. This time we see an error message! Why?
      We don't want that when we display a new (empty) hero.
      Inspecting the element in the browser tools reveals that the name input box is no longer pristine.
      Replacing the hero did not restore the pristine state of the control.
      Upon reflection, we realize that Angular cannot distinguish between replacing the entire hero and
      clearing the name property programmatically. Angular makes no assumptions and leaves the control in its current, dirty state.
      We'll have to reset the form controls manually with a small trick. We add an active flag to the component, initialized to true.
       When we add a new hero, we toggle active false and then immediately back to true with a quick setTimeout. => ngIf template trick
      */
  }
  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(heroForm)}}
  showFormControls(form: NgForm) {

    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }

  /////////////////////////////

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/