"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Chats_hbs_1 = tslib_1.__importDefault(require("./Chats.hbs"));
require("./chats.scss ");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const chats_1 = require("../../api/chat/chats");
const menu_control_1 = tslib_1.__importDefault(require("./components/menu-control/menu-control"));
const router_1 = require("../../utils/router/router");
const store_1 = tslib_1.__importStar(require("../../utils/store/store"));
const helpers_1 = require("./helpers");
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
const item_chat_1 = tslib_1.__importDefault(require("./components/item-chat/item-chat"));
const current_chat_1 = tslib_1.__importDefault(require("./components/current-chat/current-chat"));
class Chats extends block_1.default {
    controller;
    router;
    constructor() {
        super({
            chats: new item_chat_1.default(),
            currentChat: new current_chat_1.default(),
            avatarProfile: '',
            menuControl: new menu_control_1.default({
                events: {
                    click: () => {
                        this.router.go('/profile');
                    }
                }
            }),
            addChat: new link_1.default({
                text: 'Add new chat + ',
                events: {
                    click: () => {
                        const title = prompt('Please enter chat name');
                        if (title) {
                            this.controller.createChat({ title }).then(() => {
                                this.updateChats();
                            });
                        }
                    },
                }
            }),
        });
        this.controller = new chats_1.chatsAPI();
        this.router = new router_1.Router();
        this.updateProfileAvatar();
        this.updateChats();
        store_1.default.on(store_1.StoreEvents.UpdatedUser, () => {
            this.updateProfileAvatar();
        });
    }
    updateChats() {
        this.controller.getChats().then((response) => {
            const chatsResponse = (0, helpers_1.getDataToChats)(response);
            store_1.default.set('chats', chatsResponse);
            store_1.default.emit(store_1.StoreEvents.UpdatedChats);
        });
    }
    updateProfileAvatar() {
        const { user } = store_1.default.getState();
        this.setProps({ avatarProfile: (0, helpers_1.getAvatar)(user?.avatar) });
    }
    render() {
        return this.compile(Chats_hbs_1.default, this.props);
    }
}
exports.default = Chats;
//# sourceMappingURL=chats.js.map