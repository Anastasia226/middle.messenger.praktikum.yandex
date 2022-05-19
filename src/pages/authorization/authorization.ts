import Handlebars from "handlebars";
import authorization from './Authorization.hbs';
import input from "../../components/input/Input.hbs";
import button from "../../components/button/Button.hbs";
import link from "../../components/link/Link.hbs";
import './authorization.scss '


const authorizationData = {
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text'
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password'
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

Handlebars.registerPartial('authorization', authorization);
export default () => {
    return authorization({
        login: input(authorizationData.login),
        password: input(authorizationData.password),
        btnEnter: button(authorizationData.button),
        link: link(authorizationData.link),
    })
}