"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSettingsAPI = void 0;
const tslib_1 = require("tslib");
const api_1 = require("../api");
const store_1 = tslib_1.__importDefault(require("../../utils/store/store"));
class userSettingsAPI {
    request;
    baseUrl;
    constructor() {
        this.request = new api_1.HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }
    async updateProfile(data) {
        const response = await this.request.put(`${this.baseUrl}/user/profile`, {
            data,
        });
        const user = JSON.parse(response.response);
        store_1.default.set('user', user);
        return user;
    }
    updatePassword(data) {
        return this.request.put(`${this.baseUrl}/user/password`, {
            data,
        });
    }
    async updateProfileAvatar(data) {
        const response = await this.request.put(`${this.baseUrl}/user/profile/avatar`, {
            headers: {},
            data
        });
        const user = JSON.parse(response.response);
        store_1.default.set('user', user);
        return user;
    }
    async searchUser(data) {
        const response = await this.request.post(`${this.baseUrl}/user/search`, {
            data,
        });
        return JSON.parse(response.response);
    }
}
exports.userSettingsAPI = userSettingsAPI;
//# sourceMappingURL=user.js.map