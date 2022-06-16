import profileEdit from './ProfileEdit.hbs';
import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './profile-edit.scss';
import Block from "../../utils/block/block";
import Link from "../../components/link/link";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { emailRule, loginRule, nameRule, phoneRule } from "../../const/regex";
import { Router } from "../../utils/router/router";
import store from "../../utils/store/store";
import { userSettingsAPI } from "../../api/user/user";

const { user } = store.getState()
console.log(user)
const profileData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        value: user?.email as string, // TODO: получить данные из стора
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
    first_name: {
        name: 'first_name',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        value: 'Anastasiia',
        validation: nameRule,
    },
    lastName: {
        name: 'second_name',
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
    },
    buttonSave: {
        id: 'btn-edit-profile',
        value: 'Save',
    },
};

export default class ProfileEdit extends Block {
    router: Router;
    controller: userSettingsAPI;

    constructor() {
        super({
            linkCancel: new Link({
                ...profileData.linkCancel,
                events: {
                    click: () => {
                        this.router.go('/profile');
                    },
                }
            }),
            profilePhoto: profilePhoto(),
            data: profileData.email,
            email: new Input(profileData.email),
            login: new Input(profileData.login),
            firstName: new Input(profileData.first_name),
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
                                first_name: data.get('first_name'),
                                display_name: data.get('first_name'),
                                second_name: data.get('second_name'),
                                phone: data.get('telephone'),
                            }
                            this.controller.updateProfile(result).then(() => {
                                this.router.go('/profile');
                            });
                        }
                    }
                }
            ),
        });
        this.router = new Router();
        this.controller = new userSettingsAPI();

        // const { user } = store.getState()
        // profileData.email = { ...profileData.email, value: user?.email as string }
        // profileData.login = { ...profileData.login, value: user?.login as string }
        // profileData.first_name = { ...profileData.first_name, value: user?.first_name as string }
        // profileData.lastName = { ...profileData.lastName, value: user?.second_name as string }
        // profileData.telephone = { ...profileData.telephone, value: user?.phone as string }
        // this.getContent()
        // console.log(this.getContent(), 1)
        // // console.log(this.compile(input, profileData.email).firstElementChild as HTMLElement, 3)
        // this.setProps({ email: this.compile(input, profileData.email).firstElementChild, data: profileData.email });
    }

    render() {

        return this.compile(profileEdit, this.props);
    }
}