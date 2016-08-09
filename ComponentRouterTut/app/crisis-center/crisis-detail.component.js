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
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromPromise');
var crisis_service_1 = require('./crisis.service');
var dialog_service_1 = require('../dialog.service');
var CrisisDetailComponent = (function () {
    function CrisisDetailComponent(service, route, router, dialogService) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.dialogService = dialogService;
    }
    CrisisDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            var id = +params['id'];
            _this.service.getCrisis(id)
                .then(function (crisis) {
                if (crisis) {
                    _this.editName = crisis.name;
                    _this.crisis = crisis;
                }
                else {
                    _this.gotoCrises();
                }
            });
        });
    };
    CrisisDetailComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    CrisisDetailComponent.prototype.cancel = function () {
        this.gotoCrises();
    };
    CrisisDetailComponent.prototype.save = function () {
        this.crisis.name = this.editName;
        this.gotoCrises();
    };
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
    CrisisDetailComponent.prototype.canDeactivate = function () {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.crisis || this.crisis.name === this.editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        var p = this.dialogService.confirm('Discard changes?');
        var o = Observable_1.Observable.fromPromise(p);
        return o;
    };
    //QUERY PARAMERTS PLACED
    /*
    Compare with this:
      
      gotoHeroes() {
        let heroId = this.hero ? this.hero.id : null;
        this.router.navigate(['/heroes'], { queryParams: { id: heroId, foo: 'foo' } });
      }
    }
    
    */
    CrisisDetailComponent.prototype.gotoCrises = function () {
        var crisisId = this.crisis ? this.crisis.id : null;
        // Pass along the hero id if available
        // so that the CrisisListComponent can select that hero.
        // Add a totally useless `foo` parameter for kicks.
        // Absolute link
        this.router.navigate(['/crisis-center', { id: crisisId, foo: 'foo' }]);
    };
    CrisisDetailComponent = __decorate([
        core_1.Component({
            template: "\n  <div *ngIf=\"crisis\">\n    <h3>\"{{editName}}\"</h3>\n    <div>\n      <label>Id: </label>{{crisis.id}}</div>\n    <div>\n      <label>Name: </label>\n      <input [(ngModel)]=\"editName\" placeholder=\"name\"/>\n    </div>\n    <p>\n      <button (click)=\"save()\">Save</button>\n      <button (click)=\"cancel()\">Cancel</button>\n    </p>\n  </div>\n  ",
            styles: ['input {width: 20em}']
        }), 
        __metadata('design:paramtypes', [crisis_service_1.CrisisService, (typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, dialog_service_1.DialogService])
    ], CrisisDetailComponent);
    return CrisisDetailComponent;
    var _a, _b;
}());
exports.CrisisDetailComponent = CrisisDetailComponent;
//# sourceMappingURL=crisis-detail.component.js.map