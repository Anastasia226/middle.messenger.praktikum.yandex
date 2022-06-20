"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesAPI = void 0;
class MessagesAPI {
    socket;
    constructor(userId, chatId, token, callback) {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        this.socket.addEventListener("open", callback.onOpen);
        this.socket.addEventListener("close", callback.onClose);
        this.socket.addEventListener("message", callback.onMessage);
        // @ts-expect-error
        this.socket.addEventListener("error", callback.onError);
    }
    _send(data) {
        return this.socket.send(JSON.stringify(data));
    }
    sendMessage(content) {
        return this._send({ content, type: "message" });
    }
    requestMessages(from) {
        return this._send({ content: String(from), type: "get old" });
    }
    ping() {
        return this._send({ content: "", type: "ping" });
    }
    close() {
        return this.socket.close();
    }
}
exports.MessagesAPI = MessagesAPI;
//# sourceMappingURL=messages_api.js.map