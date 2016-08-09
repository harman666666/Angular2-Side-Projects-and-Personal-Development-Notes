import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { Crisis, CrisisService } from './crisis.service';
import { DialogService } from '../dialog.service';

@Component({
  template: `
  <div *ngIf="crisis">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{crisis.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
  styles: ['input {width: 20em}']
})

export class CrisisDetailComponent implements OnInit, OnDestroy {
  crisis: Crisis;
  editName: string;
  private sub: any;



  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
    ) { }

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        let id = +params['id'];
        this.service.getCrisis(id)
          .then(crisis => {
            if (crisis) {
              this.editName = crisis.name;
              this.crisis = crisis;
            } else { // id not found
              this.gotoCrises();
            }
          });
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }


/*
What if the user tries to navigate away without saving or canceling? 
The user could push the browser back button or click the heroes link. Both actions trigger a navigation. Should the app save or cancel automatically?
We'll do neither. Instead we'll ask the user to make that choice explicitly in a confirmation dialog box that waits asynchronously for the user's answer.

The DialogService (injected in the AppComponent for app-wide use) does the asking.
It returns a promise that resolves when the user eventually decides what to do: either to discard changes and navigate away (true) 
or to preserve the pending changes and stay in the crisis editor (false).
We will take the result of that promise and convert it to an Observable for our guard to use.

We create a Guard that will check for the presence of a canDeactivate function in our component, in this case being CrisisDetailComponent. => Go to Guard
We don't need to know the details of how our CrisisDetailComponent confirms deactivation. This makes our guard reusable, which is an easy win for us

Notice that the canDeactivate method can return synchronously; it returns true immediately if there is no crisis(no crisis selected) 
or there are no pending changes. But it can also return a promise or an Observable and the router will wait for that to 
resolve to truthy (navigate) or falsey (stay put).
*/
  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    let p = this.dialogService.confirm('Discard changes?');
    let o = Observable.fromPromise(p);
    return o;
  }

//QUERY PARAMERTS PLACED
/*
Compare with this:
  
  gotoHeroes() {
    let heroId = this.hero ? this.hero.id : null;
    this.router.navigate(['/heroes'], { queryParams: { id: heroId, foo: 'foo' } });
  }
}

*/
  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.id : null;
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    // Absolute link
    this.router.navigate(['/crisis-center', {id: crisisId, foo: 'foo'}]);
  }
}


