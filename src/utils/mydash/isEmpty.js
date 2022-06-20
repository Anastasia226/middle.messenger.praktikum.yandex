"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
function isEmpty(value) {
    if (typeof value === 'number') {
        return true;
    }
    if (value === '') {
        return true;
    }
    if (typeof value === 'boolean') {
        return true;
    }
    return !value;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map