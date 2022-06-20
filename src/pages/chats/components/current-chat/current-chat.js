"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CurrentChat_hbs_1 = tslib_1.__importDefault(require("./CurrentChat.hbs"));
const block_1 = tslib_1.__importDefault(require("../../../../utils/block/block"));
const button_circle_1 = tslib_1.__importDefault(require("../../../../components/button/button-circle/button-circle"));
const store_1 = tslib_1.__importStar(require("../../../../utils/store/store"));
const link_1 = tslib_1.__importDefault(require("../../../../components/link/link"));
const chats_1 = require("../../../../api/chat/chats");
const user_1 = require("../../../../api/user/user");
const input_file_1 = tslib_1.__importDefault(require("../../../../components/input-file/input-file"));
const messages_controller_1 = tslib_1.__importDefault(require("../../controller/messages-controller"));
class currentChat extends block_1.default {
    controller;
    userController;
    constructor() {
        super({
            activeChat: null,
            usersChat: null,
            avatarChat: '',
            messages: [],
            inputFile: new input_file_1.default({
                events: {
                    change: () => {
                        const myUserForm = document.getElementById('myUserForm');
                        const form = new FormData(myUserForm);
                        const { chatId } = store_1.default.getState();
                        form.append("chatId", String(chatId));
                        this.controller.updateChatAvatar(form).then(() => {
                            alert('Avatar chat changed ');
                        });
                    }
                }
            }),
            addUser: new link_1.default({
                text: 'Add user +',
                events: {
                    click: async () => {
                        const login = prompt('Please enter user login');
                        const { chatId } = store_1.default.getState();
                        const users = await this.userController.searchUser({ login });
                        if (users) {
                            const searchUser = users.find((user) => user.login === login);
                            if (searchUser) {
                                this.controller.addUserToChat({ chatId, users: [searchUser.id] }).then(() => {
                                    alert(`${searchUser.first_name} ${searchUser.second_name} was added`);
                                    this.controller.getChatUsers(chatId).then((response) => {
                                        const usersChat = response?.map((user) => `${user.first_name} ${user.second_name}`).join(',');
                                        store_1.default.set('usersChat', usersChat);
                                    });
                                });
                            }
                            else {
                                alert('User not found');
                            }
                        }
                    },
                }
            }),
            buttonCircle: new button_circle_1.default({
                id: 'send-message-btn',
                events: {
                    click: () => {
                        const inputMessage = document.getElementById('message-text');
                        if (inputMessage?.value.trim().length > 0)
                            messages_controller_1.default.sendMessage(inputMessage.value.trim());
                    }
                }
            }),
        });
        this.controller = new chats_1.chatsAPI();
        this.userController = new user_1.userSettingsAPI();
        store_1.default.on(store_1.StoreEvents.UpdatedUser, () => {
            this.updateCurrentChat();
        });
        store_1.default.on(store_1.StoreEvents.UpdatedMessages, () => {
            this.updateMessages();
        });
    }
    updateCurrentChat() {
        const { activeChat, usersChat } = store_1.default.getState();
        this.setProps({ activeChat, usersChat, avatarChat: activeChat?.avatar });
    }
    updateMessages() {
        const { messages } = store_1.default.getState();
        this.setProps({ messages });
    }
    render() {
        return this.compile(CurrentChat_hbs_1.default, this.props);
    }
}
exports.default = currentChat;
//# sourceMappingURL=current-chat.js.map