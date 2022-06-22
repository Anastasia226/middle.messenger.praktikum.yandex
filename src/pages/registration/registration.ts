import registration from './Registration.hbs';
import './registration.scss';
import Block from '../../utils/block/block';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import {
  emailRule, loginRule, nameRule, passwordRule, phoneRule,
} from '../../const/regex';
import { Router } from '../../utils/router/router';
import { userAPI } from '../../api/user/user-login';
import { isValid } from '../../utils/mydash/isValid';
import { FieldReg } from './types';

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
  first_name: {
    name: 'first_name',
    label: 'First Name',
    placeholder: 'First Name',
    type: 'text',
    validation: nameRule,
  },
  second_name: {
    name: 'second_name',
    label: 'Last Name',
    placeholder: 'Last Name',
    type: 'text',
    validation: nameRule,
  },
  phone: {
    name: 'phone',
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
  },
};

export default class Registration extends Block {
  router: Router;

  controller: userAPI;

  constructor() {
    super({
      email: new Input(registrationData.email),
      login: new Input(registrationData.login),
      firstName: new Input(registrationData.first_name),
      lastName: new Input(registrationData.second_name),
      telephone: new Input(registrationData.phone),
      password: new Input(registrationData.password),
      passwordRepeat: new Input(registrationData.passwordRepeat),
      link: new Link({
        ...registrationData.link,
        events: {
          click: () => {
            this.router.go('/authorization');
          },
        },
      }),
      btnOk: new Button(
        {
          ...registrationData.button,
          events: {
            click: async () => {
              const formReg = document.getElementById('form-registration') as HTMLFormElement;
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
                const str = value[0] as keyof typeof registrationData;
                isValidForm = isValid(value[1] as string, (registrationData[str] as FieldReg).validation.regex);
              });
              if (isValidForm) {
                const response = await this.controller.signUp(result);
                if (response) {
                  this.router.go('/messenger');
                }
                return;
              }
              alert('Error validation');
            },
          },
        },
      ),
    });
    this.router = new Router();
    this.controller = new userAPI();
  }

  render() {
    return this.compile(registration, this.props);
  }
}
