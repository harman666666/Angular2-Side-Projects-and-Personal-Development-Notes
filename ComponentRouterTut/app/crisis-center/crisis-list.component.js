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
var crisis_service_1 = require('./crisis.service');
var CrisisListComponent = (function () {
    function CrisisListComponent(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
    }
    CrisisListComponent.prototype.isSelected = function (crisis) { return crisis.id === this.selectedId; };
    //QUERY PARAMETERS
    /*
    Look at the browser address bar again. It's different. It looks something like this:
    localhost:3000/crisis-center/;id=3;foo=foo
    The query string parameters are no longer separated by "?" and "&". They are separated by semicolons (;) This is matrix URL notation —
    something we may not have seen before.
    */
    CrisisListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            _this.selectedId = +params['id'];
            _this.service.getCrises()
                .then(function (crises) { return _this.crises = crises; });
        });
    };
    CrisisListComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    CrisisListComponent.prototype.onSelect = function (crisis) {
        // Navigate with Absolute link
        this.router.navigate(['/crisis-center', crisis.id]);
    };
    CrisisListComponent = __decorate([
        core_1.Component({
            template: "\n    <ul class=\"items\">\n      <li *ngFor=\"let crisis of crises\"\n        [class.selected]=\"isSelected(crisis)\"\n        (click)=\"onSelect(crisis)\">\n        <span class=\"badge\">{{crisis.id}}</span> {{crisis.name}}\n      </li>\n    </ul>\n  ",
        }), 
        __metadata('design:paramtypes', [crisis_service_1.CrisisService, (typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
    ], CrisisListComponent);
    return CrisisListComponent;
    var _a, _b;
}());
exports.CrisisListComponent = CrisisListComponent;
//# sourceMappingURL=crisis-list.component.js.map