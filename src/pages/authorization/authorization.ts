import authorization from './Authorization.hbs';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import './authorization.scss '
import Block from '../../utils/block/block';
import { loginRule, passwordRule } from '../../const/regex';

const authorizationData = {
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        validation: loginRule,
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        validation: passwordRule,
    },
    button: {
        id: 'btn-authorization',
        value: 'Enter',
    },
    link: {
        text: 'No account?',
        href: '/registration',
    }
}

export default class Authorization extends Block {
    constructor() {
        super({
            login: new Input(authorizationData.login),
            password: new Input(authorizationData.password),
            btnEnter: new Button(
                {
                    ...authorizationData.button, events: {
                        click: () => {
                            const formAuth = document.getElementById('form-authorization') as HTMLFormElement;
                            const data = new FormData(formAuth);
                            const result = {
                                login: data.get('login'),
                                password: data.get('password'),
                            }
                            console.log(result);
                        }
                    }
                }
            ),
            link: new Link(authorizationData.link),
        });
    }

    render() {
        return this.compile(authorization, this.props);
    }
}
