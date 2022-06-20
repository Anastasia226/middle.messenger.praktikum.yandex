"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = exports.WebsocketEvents = void 0;
const tslib_1 = require("tslib");
const event_bus_1 = require("../../../utils/event-bus/event-bus");
const messages_api_1 = require("../../../api/messages/messages_api");
const store_1 = tslib_1.__importStar(require("../../../utils/store/store"));
const chats_1 = require("../../../api/chat/chats");
const helpers_1 = require("../helpers");
var WebsocketEvents;
(function (WebsocketEvents) {
    WebsocketEvents["PING_CONNECTED"] = "ping-connected";
    WebsocketEvents["PING_DISCONNECTED"] = "ping-disconnected";
    WebsocketEvents["OLD_MESSAGES"] = "received-old-messages";
    WebsocketEvents["NEW_MESSAGE"] = "received-new-message";
})(WebsocketEvents = exports.WebsocketEvents || (exports.WebsocketEvents = {}));
const pingInterval = 60000;
class MessagesController extends event_bus_1.EventBus {
    static EVENTS;
    controller;
    controllerChats;
    selected;
    constructor() {
        super();
        this.controllerChats = new chats_1.chatsAPI();
    }
    formattedData(message) {
        const { user } = store_1.default.getState();
        return {
            ...message,
            time: (0, helpers_1.getTime)(message.time),
            isYouSender: message.user_id === user?.id,
        };
    }
    getOldMessages(messages) {
        const messagesForStore = messages.map((message) => this.formattedData(message));
        store_1.default.set('messages', messagesForStore.reverse());
        store_1.default.emit(store_1.StoreEvents.UpdatedMessages);
    }
    getNewMessages(message) {
        let { messages } = store_1.default.getState();
        if (messages !== undefined) {
            messages.push(this.formattedData(message));
        }
        else {
            messages = [this.formattedData(message)];
        }
        store_1.default.set('messages', messages);
        store_1.default.emit(store_1.StoreEvents.UpdatedMessages);
    }
    openHandler() {
        console.log("Connection established");
        this.requestMessages();
        this.ping();
    }
    async closeHandler(event) {
        if (!event.wasClean) {
            await this.open();
        }
    }
    messageHandler(event) {
        const message = JSON.parse(event.data);
        if (Array.isArray(message)) {
            this.getOldMessages(message);
        }
        else if (message.type === "message") {
            this.getNewMessages(message);
        }
        else {
            console.log(message);
        }
    }
    onErrorHandler(event) {
        console.log("Error", event.message);
    }
    async open(selected) {
        this.close();
        if (selected !== undefined) {
            this.selected = selected;
        }
        if (this.selected === undefined) {
            throw new Error("You should select chat");
        }
        const { user } = store_1.default.getState();
        const { token } = await this.controllerChats.getChatToken(this.selected.id);
        if (token === undefined) {
            throw new Error("Token not received");
        }
        this.controller = new messages_api_1.MessagesAPI(user.id, this.selected.id, token, {
            onOpen: this.openHandler.bind(this),
            onClose: this.closeHandler.bind(this),
            onMessage: this.messageHandler.bind(this),
            onError: this.onErrorHandler.bind(this)
        });
    }
    close() {
        try {
            if (this.controller !== undefined) {
                this.controller.close();
                this.controller = undefined;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async requestMessages() {
        try {
            this.controller?.requestMessages(0);
        }
        catch (e) {
            console.log(e);
        }
    }
    sendMessage(message) {
        if (this.controller !== undefined) {
            this.controller.sendMessage(message);
            this.requestMessages();
        }
    }
    ping() {
        setTimeout(() => {
            try {
                this.controller?.ping();
                this.ping();
            }
            catch (e) {
                console.log(e);
            }
        }, pingInterval);
    }
}
exports.MessagesController = MessagesController;
exports.default = new MessagesController();
//# sourceMappingURL=messages-controller.js.map