"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatsAPI = void 0;
const api_1 = require("../api");
class chatsAPI {
    request;
    baseUrl;
    constructor() {
        this.request = new api_1.HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }
    getChats() {
        return this.request.get(`${this.baseUrl}/chats`);
    }
    createChat(data) {
        return this.request.post(`${this.baseUrl}/chats`, {
            data,
        });
    }
    async getChatToken(id) {
        const response = await this.request.post(`${this.baseUrl}/chats/token/${id}`, {});
        return JSON.parse((response).response);
    }
    getChatUsers(id) {
        return this.request.get(`${this.baseUrl}/chats/${id}/users`, {});
    }
    addUserToChat(data) {
        return this.request.put(`${this.baseUrl}/chats/users`, {
            data,
        });
    }
    updateChatAvatar(data) {
        return this.request.put(`${this.baseUrl}/chats/avatar`, {
            headers: {},
            data,
        });
    }
}
exports.chatsAPI = chatsAPI;
//# sourceMappingURL=chats.js.map