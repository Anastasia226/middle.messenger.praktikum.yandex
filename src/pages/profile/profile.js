"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./profile.scss");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
const Profile_hbs_1 = tslib_1.__importDefault(require("./Profile.hbs"));
const store_1 = tslib_1.__importStar(require("../../utils/store/store"));
const router_1 = require("../../utils/router/router");
const user_login_1 = require("../../api/user/user-login");
const helpers_1 = require("../chats/helpers");
const profileData = {
    fields: [],
    linkProfile: {
        text: 'Edit profile',
    },
    linkPassword: {
        text: 'Edit password',
    },
    linkToChats: {
        text: '<-- Back to chats',
    },
    logOut: {
        text: 'Exit',
    },
};
class ProfileEdit extends block_1.default {
    router;
    controller;
    fields = [];
    constructor() {
        super({
            linkProfile: new link_1.default({
                ...profileData.linkProfile,
                events: {
                    click: () => {
                        this.router.go('/profile-edit');
                    },
                }
            }),
            linkPassword: new link_1.default({
                ...profileData.linkPassword,
                events: {
                    click: () => {
                        this.router.go('/password-edit');
                    },
                }
            }),
            linkToChats: new link_1.default({
                ...profileData.linkToChats,
                events: {
                    click: () => {
                        this.router.go('/messenger');
                    },
                }
            }),
            logOut: new link_1.default({
                ...profileData.logOut, events: {
                    click: async () => {
                        const response = await this.controller.logOut();
                        if (response) {
                            store_1.default.reset();
                            this.router.go('/authorization');
                        }
                    },
                }
            }),
            avatarProfile: '',
            fields: [],
        });
        this.router = new router_1.Router();
        this.controller = new user_login_1.userAPI();
        this.updateProfile();
        store_1.default.on(store_1.StoreEvents.UpdatedUser, () => {
            this.updateProfile();
        });
    }
    updateProfile() {
        const { user } = store_1.default.getState();
        this.setProps({ avatarProfile: (0, helpers_1.getAvatar)(user?.avatar) });
        this.fields = [
            {
                name: 'Email',
                value: user?.email
            },
            {
                name: 'Login',
                value: user?.login,
            },
            {
                name: 'FirstName',
                value: user?.first_name,
            },
            {
                name: 'LastName',
                value: user?.second_name,
            },
            {
                name: 'Telephone',
                value: user?.phone,
            },
        ];
        this.setProps({ fields: this.fields });
    }
    render() {
        return this.compile(Profile_hbs_1.default, this.props);
    }
}
exports.default = ProfileEdit;
//# sourceMappingURL=profile.js.map