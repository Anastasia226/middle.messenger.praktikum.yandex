"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Button_hbs_1 = tslib_1.__importDefault(require("./Button.hbs"));
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
class Button extends block_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return this.compile(Button_hbs_1.default, { ...this.props });
    }
}
exports.default = Button;
//# sourceMappingURL=button.js.map