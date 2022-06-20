"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryStringify = void 0;
function isObject(value) {
    return Object.prototype === Object.getPrototypeOf(value);
}
function stringifyObject(obj2) {
    return Object.entries(obj2).reduce((acc, [id, value]) => {
        if (Array.isArray(value) || isObject(value)) {
            return acc.concat([stringifyObject(value).map((item) => `[${id}]${item}`)]);
        }
        return acc.concat(`[${id}]=${value}`);
    }, []);
}
const flatSingle = (arr) => [].concat(...arr);
const queryStringify = (data) => {
    if (!isObject(data)) {
        throw new Error('input must be an object');
    }
    const arr = Object.entries(data)
        .reduce((acc, [key, value]) => {
        if (Array.isArray(value) || isObject(value)) {
            return acc.concat([stringifyObject(value).map((item) => `${key}${item}`)]);
        }
        return acc.concat([`${key}=${value}`]);
    }, []);
    return flatSingle(arr).join('&');
};
exports.queryStringify = queryStringify;
//# sourceMappingURL=query-string.js.map