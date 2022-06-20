"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MenuControl_hbs_1 = tslib_1.__importDefault(require("./MenuControl.hbs"));
const block_1 = tslib_1.__importDefault(require("../../../../utils/block/block"));
class menuControl extends block_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return this.compile(MenuControl_hbs_1.default, this.props);
    }
}
exports.default = menuControl;
//# sourceMappingURL=menu-control.js.map