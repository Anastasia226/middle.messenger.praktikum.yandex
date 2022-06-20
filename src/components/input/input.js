"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Input_hbs_1 = tslib_1.__importDefault(require("./Input.hbs"));
require("./input.scss");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const error_validation_1 = tslib_1.__importDefault(require("../error-validation/error-validation"));
class Input extends block_1.default {
    constructor(props) {
        super({
            ...props,
            className: '',
            error: new error_validation_1.default({
                textError: props?.validation?.messageError
            }),
            events: {
                focusout: (event) => {
                    if (event && !event.target?.value.match(props.validation?.regex)) {
                        this.addClassName('error');
                    }
                    else {
                        this.removeClassName('error');
                    }
                }
            }
        });
    }
    addClassName(className) {
        this.getContent()?.classList.add(className);
        this.children.error.getContent()?.classList.add(className);
    }
    removeClassName(className) {
        this.getContent()?.classList.remove(className);
        this.children.error.getContent()?.classList.remove(className);
    }
    render() {
        return this.compile(Input_hbs_1.default, { ...this.props });
    }
}
exports.default = Input;
//# sourceMappingURL=input.js.map