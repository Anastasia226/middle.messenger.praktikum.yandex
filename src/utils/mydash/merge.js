"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
function merge(lhs, rhs) {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }
        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p], rhs[p]);
            }
            else {
                lhs[p] = rhs[p];
            }
        }
        catch (e) {
            lhs[p] = rhs[p];
        }
    }
    return lhs;
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map