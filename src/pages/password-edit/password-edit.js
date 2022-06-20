"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PasswordEdit_hbs_1 = tslib_1.__importDefault(require("./PasswordEdit.hbs"));
require("./password-edit.scss");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const input_1 = tslib_1.__importDefault(require("../../components/input/input"));
const button_1 = tslib_1.__importDefault(require("../../components/button/button"));
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
const regex_1 = require("../../const/regex");
const router_1 = require("../../utils/router/router");
const user_1 = require("../../api/user/user");
const store_1 = tslib_1.__importStar(require("../../utils/store/store"));
const helpers_1 = require("../chats/helpers");
const profileData = {
    oldPassword: {
        name: 'old_password',
        label: 'Old password',
        placeholder: 'Old password',
        type: 'password',
        value: '',
        validation: regex_1.passwordRule,
    },
    newPassword: {
        name: 'new_password',
        label: 'New password',
        placeholder: 'New password',
        type: 'password',
        value: '',
        validation: regex_1.passwordRule,
    },
    linkCancel: {
        text: 'Cancel',
    },
    buttonSave: {
        id: 'btn-edit-password',
        value: 'Save',
    },
};
class PasswordEdit extends block_1.default {
    router;
    controller;
    constructor() {
        super({
            avatarProfile: '',
            linkCancel: new link_1.default({
                ...profileData.linkCancel,
                events: {
                    click: () => {
                        this.router.go('/profile');
                    },
                }
            }),
            oldPassword: new input_1.default(profileData.oldPassword),
            newPassword: new input_1.default(profileData.newPassword),
            buttonSave: new button_1.default({
                ...profileData.buttonSave, events: {
                    click: () => {
                        const formEdit = document.getElementById('form-edit-password');
                        const data = new FormData(formEdit);
                        const result = {
                            oldPassword: data.get('old_password'),
                            newPassword: data.get('new_password'),
                        };
                        this.controller.updatePassword(result).then(() => {
                            this.router.go('/profile');
                        });
                    }
                }
            }),
        });
        this.router = new router_1.Router();
        this.controller = new user_1.userSettingsAPI();
        this.updateProfileAvatar();
        store_1.default.on(store_1.StoreEvents.UpdatedUser, () => {
            this.updateProfileAvatar();
        });
    }
    updateProfileAvatar() {
        const { user } = store_1.default.getState();
        this.setProps({ avatarProfile: (0, helpers_1.getAvatar)(user?.avatar) });
    }
    render() {
        return this.compile(PasswordEdit_hbs_1.default, this.props);
    }
}
exports.default = PasswordEdit;
//# sourceMappingURL=password-edit.js.map