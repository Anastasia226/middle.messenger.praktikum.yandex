"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Registration_hbs_1 = tslib_1.__importDefault(require("./Registration.hbs"));
require("./registration.scss");
const block_1 = tslib_1.__importDefault(require("../../utils/block/block"));
const input_1 = tslib_1.__importDefault(require("../../components/input/input"));
const button_1 = tslib_1.__importDefault(require("../../components/button/button"));
const link_1 = tslib_1.__importDefault(require("../../components/link/link"));
const regex_1 = require("../../const/regex");
const router_1 = require("../../utils/router/router");
const user_login_1 = require("../../api/user/user-login");
const isValid_1 = require("../../utils/mydash/isValid");
const registrationData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        validation: regex_1.emailRule,
    },
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        validation: regex_1.loginRule,
    },
    first_name: {
        name: 'first_name',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        validation: regex_1.nameRule,
    },
    second_name: {
        name: 'second_name',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        validation: regex_1.nameRule,
    },
    phone: {
        name: 'phone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel',
        validation: regex_1.phoneRule,
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        validation: regex_1.passwordRule,
    },
    passwordRepeat: {
        name: 'passwordRepeat',
        label: 'Password repeat',
        placeholder: 'Password repeat',
        type: 'password',
        validation: regex_1.passwordRule,
    },
    button: {
        id: 'btn-registration',
        value: 'Ok',
    },
    link: {
        text: 'Go to authorization',
        href: '/authorization',
    }
};
class Registration extends block_1.default {
    router;
    controller;
    constructor() {
        super({
            email: new input_1.default(registrationData.email),
            login: new input_1.default(registrationData.login),
            firstName: new input_1.default(registrationData.first_name),
            lastName: new input_1.default(registrationData.second_name),
            telephone: new input_1.default(registrationData.phone),
            password: new input_1.default(registrationData.password),
            passwordRepeat: new input_1.default(registrationData.passwordRepeat),
            link: new link_1.default({
                ...registrationData.link,
                events: {
                    click: () => {
                        this.router.go('/authorization');
                    },
                }
            }),
            btnOk: new button_1.default({
                ...registrationData.button, events: {
                    click: async () => {
                        const formReg = document.getElementById('form-registration');
                        const data = new FormData(formReg);
                        const result = {
                            email: data.get('email'),
                            login: data.get('login'),
                            first_name: data.get('first_name'),
                            second_name: data.get('second_name'),
                            phone: data.get('phone'),
                            password: data.get('password'),
                        };
                        let isValidForm = false;
                        Object.entries(result).forEach((value) => {
                            const str = value[0];
                            isValidForm = (0, isValid_1.isValid)(value[1], registrationData[str].validation.regex);
                        });
                        if (isValidForm) {
                            const response = await this.controller.signUp(result);
                            if (response) {
                                this.router.go('/messenger');
                            }
                            return;
                        }
                        alert('Error validation');
                    }
                }
            }),
        });
        this.router = new router_1.Router();
        this.controller = new user_login_1.userAPI();
    }
    render() {
        return this.compile(Registration_hbs_1.default, this.props);
    }
}
exports.default = Registration;
//# sourceMappingURL=registration.js.map