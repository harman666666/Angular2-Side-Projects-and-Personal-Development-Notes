import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `,
})
export class CrisisListComponent implements OnInit, OnDestroy {
  crises: Crisis[];
  private selectedId: number;
  private sub: any;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router) { }

  isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

//QUERY PARAMETERS
/*
Look at the browser address bar again. It's different. It looks something like this:
localhost:3000/crisis-center/;id=3;foo=foo
The query string parameters are no longer separated by "?" and "&". They are separated by semicolons (;) This is matrix URL notation — 
something we may not have seen before.
*/
  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params['id'];
        this.service.getCrises()
          .then(crises => this.crises = crises);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSelect(crisis: Crisis) {
    // Navigate with Absolute link
    this.router.navigate(['/crisis-center', crisis.id]);
  }
}


