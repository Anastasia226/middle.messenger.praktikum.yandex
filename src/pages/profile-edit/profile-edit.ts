import profileEdit from './ProfileEdit.hbs';
import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './profile-edit.scss';
import Block from "../../utils/block/block";
import Link from "../../components/link/link";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { emailRule, loginRule, nameRule, phoneRule } from "../../const/regex";

const profileData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        value: 'bagaeva@yandex.ru',
        validation: emailRule,
    },
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        value: 'anastasia226',
        validation: loginRule,
    },
    firstName: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        value: 'Anastasiia',
        validation: nameRule,
    },
    lastName: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        value: 'Bagaeva',
        validation: nameRule,
    },
    telephone: {
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel',
        value: '89224411823',
        validation: phoneRule,
    },
    linkCancel: {
        text: 'Cancel',
        href: '/profile',
    },
    buttonSave: {
        id: 'btn-edit-profile',
        value: 'Save',
    },
};

export default class ProfileEdit extends Block {
    constructor() {
        super({
            linkCancel: new Link(profileData.linkCancel),
            profilePhoto: profilePhoto(),
            email: new Input(profileData.email),
            login: new Input(profileData.login),
            firstName: new Input(profileData.firstName),
            lastName: new Input(profileData.lastName),
            telephone: new Input(profileData.telephone),
            buttonSave: new Button(
                {
                    ...profileData.buttonSave, events: {
                        click: () => {
                            const formEdit = document.getElementById('form-edit-profile') as HTMLFormElement;
                            const data = new FormData(formEdit);
                            const result = {
                                email: data.get('email'),
                                login: data.get('login'),
                                firstName: data.get('firstName'),
                                lastName: data.get('lastName'),
                                telephone: data.get('telephone'),
                            }
                            console.log(result);
                        }
                    }
                }
            ),
        });
    }

    render() {
        return this.compile(profileEdit, this.props);
    }
}