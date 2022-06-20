"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ItemChat_hbs_1 = tslib_1.__importDefault(require("./ItemChat.hbs"));
const block_1 = tslib_1.__importDefault(require("../../../../utils/block/block"));
const chats_1 = require("../../../../api/chat/chats");
const store_1 = tslib_1.__importStar(require("../../../../utils/store/store"));
const messages_controller_1 = tslib_1.__importDefault(require("../../controller/messages-controller"));
class itemChat extends block_1.default {
    controller;
    constructor() {
        super({
            chatsList: [],
            events: {
                click: (event) => {
                    const id = (event.target.getAttribute('value'));
                    if (id) {
                        const { chats } = store_1.default.getState();
                        const selectedChat = chats.find((chat) => chat.id === Number(id));
                        messages_controller_1.default.open(selectedChat);
                        store_1.default.set('chatId', id);
                        const chat = chats.find((item) => item.id === Number(id));
                        store_1.default.set('activeChat', chat);
                        this.controller.getChatUsers(id).then((response) => {
                            const usersChat = response?.map((user) => `${user.first_name} ${user.second_name}`).join(',');
                            store_1.default.set('usersChat', usersChat);
                        });
                    }
                }
            }
        });
        this.controller = new chats_1.chatsAPI();
        this.updateChats();
        store_1.default.on(store_1.StoreEvents.UpdatedChats, () => {
            this.updateChats();
        });
    }
    updateChats() {
        const { chats } = store_1.default.getState();
        this.setProps({ chatsList: chats });
    }
    render() {
        return this.compile(ItemChat_hbs_1.default, this.props);
    }
}
exports.default = itemChat;
//# sourceMappingURL=item-chat.js.map