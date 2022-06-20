"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneRule = exports.nameRule = exports.emailRule = exports.passwordRule = exports.loginRule = void 0;
exports.loginRule = {
    regex: /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/,
    messageError: 'Please enter correct login',
};
exports.passwordRule = {
    regex: /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/,
    messageError: 'Please enter correct password',
};
exports.emailRule = {
    regex: /^\S+@\S+\.\S+$/,
    messageError: 'Please enter correct email',
};
exports.nameRule = {
    regex: /^(?=[\S])[A-Z]{1}[A-Za-z-]*$/,
    messageError: 'Please enter correct name',
};
exports.phoneRule = {
    regex: /^\+?[\d]{10,15}$/,
    messageError: 'Please enter correct phone',
};
//# sourceMappingURL=regex.js.map