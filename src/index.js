"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const authorization_1 = tslib_1.__importDefault(require("./pages/authorization/authorization"));
const registration_1 = tslib_1.__importDefault(require("./pages/registration/registration"));
const profile_1 = tslib_1.__importDefault(require("./pages/profile/profile"));
const error_1 = tslib_1.__importDefault(require("./pages/error/error"));
const profile_edit_1 = tslib_1.__importDefault(require("./pages/profile-edit/profile-edit"));
const password_edit_1 = tslib_1.__importDefault(require("./pages/password-edit/password-edit"));
const chats_1 = tslib_1.__importDefault(require("./pages/chats/chats"));
const router_1 = require("./utils/router/router");
const user_login_1 = require("./api/user/user-login");
require("./assets/scss/index.scss");
require("./components/input/input.scss");
require("./components/button/button.scss");
require("./components/link/link.scss");
require("./components/profile-photo/profile-photo.scss");
const router = new router_1.Router('#root');
async function isUserLogin() {
    const controller = new user_login_1.userAPI();
    await controller.getUser();
}
function main() {
    router
        .use('/', new authorization_1.default())
        .use('/authorization', new authorization_1.default())
        .use('/registration', new registration_1.default())
        .use('/profile', new profile_1.default())
        .use('/messenger', new chats_1.default())
        .use('/profile-edit', new profile_edit_1.default())
        .use('/password-edit', new password_edit_1.default())
        .use('/404', new error_1.default({ statusError: '404', messageError: 'This page not found' }))
        .use('/500', new error_1.default({ statusError: '500', messageError: 'Sorry... Page don\'t work.' }))
        .start();
}
isUserLogin()
    .finally(() => {
    main();
});
//# sourceMappingURL=index.js.map