"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ButtonCircle_hbs_1 = tslib_1.__importDefault(require("./ButtonCircle.hbs"));
const block_1 = tslib_1.__importDefault(require("../../../utils/block/block"));
require("./button-circle.scss");
class ButtonCircle extends block_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return this.compile(ButtonCircle_hbs_1.default, { ...this.props });
    }
}
exports.default = ButtonCircle;
//# sourceMappingURL=button-circle.js.map