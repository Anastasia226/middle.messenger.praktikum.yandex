"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Error_hbs_1 = tslib_1.__importDefault(require("./Error.hbs"));
require("./error.scss");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
const router_1 = require("../../utils/router/router");
const errorData = {
    link: {
        text: `Come back`,
        href: '/authorization',
        icon: '->',
    }
};
class ErrorPage extends block_1.default {
    router;
    constructor(props) {
        super({
            ...props, link: new link_1.default({
                ...errorData.link, events: {
                    click: () => {
                        this.router.back();
                    },
                }
            }),
        });
        this.router = new router_1.Router();
    }
    render() {
        return this.compile(Error_hbs_1.default, { ...this.props });
    }
}
exports.default = ErrorPage;
//# sourceMappingURL=error.js.map