"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const InputFile_hbs_1 = tslib_1.__importDefault(require("./InputFile.hbs"));
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const user_1 = require("../../api/user/user");
class InputFile extends block_1.default {
    controller;
    constructor(props) {
        super(props);
        this.controller = new user_1.userSettingsAPI();
    }
    render() {
        return this.compile(InputFile_hbs_1.default, { ...this.props });
    }
}
exports.default = InputFile;
//# sourceMappingURL=input-file.js.map