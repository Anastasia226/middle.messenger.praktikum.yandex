"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = void 0;
function last(list) {
    if (!Array.isArray(list)) {
        return undefined;
    }
    const length = list.length;
    return length ? list[length - 1] : undefined;
}
exports.last = last;
//# sourceMappingURL=last.js.map