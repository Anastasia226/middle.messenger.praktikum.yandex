import profileEdit from './ProfileEdit.hbs';
import './profile-edit.scss';
import Block from "../../utils/block/block";
import Link from "../../components/link/link";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { emailRule, loginRule, nameRule, phoneRule } from "../../const/regex";
import { Router } from "../../utils/router/router";
import store, { StoreEvents } from "../../utils/store/store";
import { userSettingsAPI } from "../../api/user/user";
import { getAvatar } from "../chats/helpers";
import InputFile from '../../components/input-file/input-file'

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
        value: '',
        validation: loginRule,
    },
    first_name: {
        name: 'first_name',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        value: '',
        validation: nameRule,
    },
    lastName: {
        name: 'second_name',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        value: '',
        validation: nameRule,
    },
    telephone: {
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel',
        value: '',
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
            avatarProfile: '',
            inputFile: new InputFile({
                events: {
                    change: () => {
                        const myUserForm = document.getElementById('myUserForm') as HTMLFormElement;
                        const form = new FormData(myUserForm);
                        this.controller.updateProfileAvatar(form).then(() => {
                            alert('Avatar changed')
                        });
                    }
                }
            }),
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
        this.updateProfile();
        store.on(StoreEvents.UpdatedUser, () => {
            this.updateProfile()
        });
    }

    updateProfile() {
        const { user } = store.getState()
        this.setProps({ avatarProfile: getAvatar(user?.avatar as string) });
    }

    render() {

        return this.compile(profileEdit, this.props);
    }
}