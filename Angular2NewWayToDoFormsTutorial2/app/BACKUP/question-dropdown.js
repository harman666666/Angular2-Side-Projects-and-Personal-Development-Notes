"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var question_base_1 = require('./question-base');
var DropdownQuestion = (function (_super) {
    __extends(DropdownQuestion, _super);
    function DropdownQuestion(options) {
        if (options === void 0) { options = {}; }
        _super.call(this, options);
        this.controlType = 'dropdown';
        this.options = [];
        this.options = options['options'] || [];
    }
    return DropdownQuestion;
}(question_base_1.QuestionBase));
exports.DropdownQuestion = DropdownQuestion;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=question-dropdown.js.map