"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Authorization_hbs_1 = tslib_1.__importDefault(require("./Authorization.hbs"));
const input_1 = tslib_1.__importDefault(require("../../components/input/input"));
const button_1 = tslib_1.__importDefault(require("../../components/button/button"));
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
require("./authorization.scss ");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const regex_1 = require("../../const/regex");
const router_1 = require("../../utils/router/router");
const user_login_1 = require("../../api/user/user-login");
const chats_1 = require("../../api/chat/chats");
const store_1 = tslib_1.__importStar(require("../../utils/store/store"));
const helpers_1 = require("../chats/helpers");
const authorizationData = {
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        validation: regex_1.loginRule,
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        validation: regex_1.passwordRule,
    },
    button: {
        id: 'btn-authorization',
        value: 'Enter',
    },
    link: {
        text: 'No account?',
        href: '/registration',
    }
};
class Authorization extends block_1.default {
    router;
    controller;
    controllerChats;
    constructor() {
        super({
            login: new input_1.default(authorizationData.login),
            password: new input_1.default(authorizationData.password),
            btnEnter: new button_1.default({
                ...authorizationData.button, events: {
                    click: async () => {
                        const formAuth = document.getElementById('form-authorization');
                        const data = new FormData(formAuth);
                        const result = {
                            login: data.get('login'),
                            password: data.get('password'),
                        };
                        this.controller.signIn(result).then(async () => {
                            const response = await this.controller.getUser();
                            if (response) {
                                store_1.default.set('user', response);
                                this.router.go('/messenger');
                            }
                            const chatsResponse = await this.controllerChats.getChats();
                            if (chatsResponse) {
                                const chats = (0, helpers_1.getDataToChats)(chatsResponse);
                                store_1.default.set('chats', chats);
                                store_1.default.emit(store_1.StoreEvents.UpdatedChats);
                            }
                        });
                    }
                }
            }),
            link: new link_1.default({
                ...authorizationData.link, events: {
                    click: () => {
                        this.router.go('/registration');
                    },
                }
            }),
        });
        this.router = new router_1.Router();
        this.controller = new user_login_1.userAPI();
        this.controllerChats = new chats_1.chatsAPI();
    }
    render() {
        return this.compile(Authorization_hbs_1.default, this.props);
    }
}
exports.default = Authorization;
//# sourceMappingURL=authorization.js.map