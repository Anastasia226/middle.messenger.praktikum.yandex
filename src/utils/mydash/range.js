"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
function range(start = 0, end, step = 1, isRight = false) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (step === 0) {
        return new Array(end - start).fill(undefined).map(() => start);
    }
    if (isRight) {
        if (end < 0) {
            return new Array((0 - end) - start).fill(undefined).map((_, index) => start - index * step).reverse();
        }
        return new Array((end - start) / step).fill(undefined).map((_, index) => start + index * step).reverse();
    }
    if (end < 0) {
        return new Array((0 - end) - start).fill(undefined).map((_, index) => start - index * step);
    }
    return new Array((end - start) / step).fill(undefined).map((_, index) => start + index * step);
}
exports.range = range;
//# sourceMappingURL=range.js.map