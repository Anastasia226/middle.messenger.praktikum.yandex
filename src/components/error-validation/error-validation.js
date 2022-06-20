"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ErrorValidation_hbs_1 = tslib_1.__importDefault(require("./ErrorValidation.hbs"));
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
require("./error-validation.scss");
class ErrorValidation extends block_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return this.compile(ErrorValidation_hbs_1.default, { ...this.props });
    }
}
exports.default = ErrorValidation;
//# sourceMappingURL=error-validation.js.map