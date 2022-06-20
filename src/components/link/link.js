"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Link_hbs_1 = tslib_1.__importDefault(require("./Link.hbs"));
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
class Link extends block_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return this.compile(Link_hbs_1.default, { ...this.props });
    }
}
exports.default = Link;
//# sourceMappingURL=link.js.map