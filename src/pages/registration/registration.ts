import Handlebars from 'handlebars';
import registration from './Registration.hbs';
import input from '../../components/input/Input.hbs';
import button from '../../components/button/Button.hbs';
import link from '../../components/link/Link.hbs';
import './registration.scss';

const registrationData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
    },
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text'
    },
    firstName: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text'
    },
    lastName: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text'
    },
    telephone: {
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel'
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password'
    },
    passwordRepeat: {
        name: 'passwordRepeat',
        label: 'Password repeat',
        placeholder: 'Password repeat',
        type: 'password'
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

Handlebars.registerPartial('registration', registration);
export default () => {
    return registration({
        email: input(registrationData.email),
        login: input(registrationData.login),
        firstName: input(registrationData.firstName),
        lastName: input(registrationData.lastName),
        telephone: input(registrationData.telephone),
        password: input(registrationData.password),
        passwordRepeat: input(registrationData.passwordRepeat),
        btnOk: button(registrationData.button),
        link: link(registrationData.link),
    });
}