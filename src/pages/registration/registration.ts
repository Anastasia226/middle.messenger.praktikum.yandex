import registration from './Registration.hbs';
import './registration.scss';
import Block from "../../utils/block/block";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import { emailRule, loginRule, nameRule, passwordRule, phoneRule } from "../../const/regex";
import { Router } from '../../utils/router/router';

const registrationData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        validation: emailRule,
    },
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        validation: loginRule,
    },
    firstName: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        validation: nameRule,
    },
    lastName: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        validation: nameRule,
    },
    telephone: {
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel',
        validation: phoneRule,
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        validation: passwordRule,
    },
    passwordRepeat: {
        name: 'passwordRepeat',
        label: 'Password repeat',
        placeholder: 'Password repeat',
        type: 'password',
        validation: passwordRule,
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

export default class Registration extends Block {
    router: Router;

    constructor() {
        super({
            email: new Input(registrationData.email),
            login: new Input(registrationData.login),
            firstName: new Input(registrationData.firstName),
            lastName: new Input(registrationData.lastName),
            telephone: new Input(registrationData.telephone),
            password: new Input(registrationData.password),
            passwordRepeat: new Input(registrationData.passwordRepeat),
            link: new Link({
                ...registrationData.link,
                events: {
                    click: () => {
                        this.router.go('/authorization');
                    },
                }
            }),
            btnOk: new Button(
                {
                    ...registrationData.button, events: {
                        click: () => {
                            const formReg = document.getElementById('form-registration') as HTMLFormElement;
                            const data = new FormData(formReg);
                            const result = {
                                email: data.get('email'),
                                login: data.get('login'),
                                firstName: data.get('firstName'),
                                lastName: data.get('lastName'),
                                telephone: data.get('telephone'),
                                password: data.get('password'),
                                passwordRepeat: data.get('passwordRepeat'),
                            }
                            console.log(result);
                        }
                    }
                }
            ),
        });
        this.router = new Router();
    }

    render() {
        return this.compile(registration, this.props);
    }
}