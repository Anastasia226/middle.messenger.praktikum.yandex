"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ProfileEdit_hbs_1 = tslib_1.__importDefault(require("./ProfileEdit.hbs"));
require("./profile-edit.scss");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
const input_1 = tslib_1.__importDefault(require("../../components/input/input"));
const button_1 = tslib_1.__importDefault(require("../../components/button/button"));
const regex_1 = require("../../const/regex");
const router_1 = require("../../utils/router/router");
const store_1 = tslib_1.__importStar(require("../../utils/store/store"));
const user_1 = require("../../api/user/user");
const helpers_1 = require("../chats/helpers");
const input_file_1 = tslib_1.__importDefault(require("../../components/input-file/input-file"));
const profileData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        value: '',
        validation: regex_1.emailRule,
    },
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        value: '',
        validation: regex_1.loginRule,
    },
    first_name: {
        name: 'first_name',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        value: '',
        validation: regex_1.nameRule,
    },
    lastName: {
        name: 'second_name',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        value: '',
        validation: regex_1.nameRule,
    },
    telephone: {
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel',
        value: '',
        validation: regex_1.phoneRule,
    },
    linkCancel: {
        text: 'Cancel',
    },
    buttonSave: {
        id: 'btn-edit-profile',
        value: 'Save',
    },
};
class ProfileEdit extends block_1.default {
    router;
    controller;
    constructor() {
        super({
            linkCancel: new link_1.default({
                ...profileData.linkCancel,
                events: {
                    click: () => {
                        this.router.go('/profile');
                    },
                }
            }),
            avatarProfile: '',
            inputFile: new input_file_1.default({
                events: {
                    change: () => {
                        const myUserForm = document.getElementById('myUserForm');
                        const form = new FormData(myUserForm);
                        this.controller.updateProfileAvatar(form).then(() => {
                            alert('Avatar changed');
                        });
                    }
                }
            }),
            data: profileData.email,
            email: new input_1.default(profileData.email),
            login: new input_1.default(profileData.login),
            firstName: new input_1.default(profileData.first_name),
            lastName: new input_1.default(profileData.lastName),
            telephone: new input_1.default(profileData.telephone),
            buttonSave: new button_1.default({
                ...profileData.buttonSave, events: {
                    click: () => {
                        const formEdit = document.getElementById('form-edit-profile');
                        const data = new FormData(formEdit);
                        const result = {
                            email: data.get('email'),
                            login: data.get('login'),
                            first_name: data.get('first_name'),
                            display_name: data.get('first_name'),
                            second_name: data.get('second_name'),
                            phone: data.get('telephone'),
                        };
                        this.controller.updateProfile(result).then(() => {
                            this.router.go('/profile');
                        });
                    }
                }
            }),
        });
        this.router = new router_1.Router();
        this.controller = new user_1.userSettingsAPI();
        this.updateProfile();
        store_1.default.on(store_1.StoreEvents.UpdatedUser, () => {
            this.updateProfile();
        });
    }
    updateProfile() {
        const { user } = store_1.default.getState();
        this.setProps({ avatarProfile: (0, helpers_1.getAvatar)(user?.avatar) });
    }
    render() {
        return this.compile(ProfileEdit_hbs_1.default, this.props);
    }
}
exports.default = ProfileEdit;
//# sourceMappingURL=profile-edit.js.map