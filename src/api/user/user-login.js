"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAPI = void 0;
const tslib_1 = require("tslib");
const api_1 = require("../api");
const store_1 = tslib_1.__importDefault(require("../../utils/store/store"));
class userAPI {
    request;
    baseUrl;
    constructor() {
        this.request = new api_1.HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }
    signUp(data) {
        return this.request.post(`${this.baseUrl}/auth/signup`, {
            data,
        });
    }
    signIn(data) {
        return this.request.post(`${this.baseUrl}/auth/signin`, {
            data,
        });
    }
    async getUser() {
        const response = await this.request.get(`${this.baseUrl}/auth/user`, {});
        store_1.default.set('user', response);
        return response;
    }
    logOut() {
        return this.request.post(`${this.baseUrl}/auth/logout`, {});
    }
}
exports.userAPI = userAPI;
//# sourceMappingURL=user-login.js.map