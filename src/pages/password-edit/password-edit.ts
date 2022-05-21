import passwordEdit from './PasswordEdit.hbs';
import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './password-edit.scss';
import Block from "../../utils/block/block";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import { passwordRule } from "../../const/regex";

const profileData = {
    oldPassword: {
        name: 'old_password',
        label: 'Old password',
        placeholder: 'Old password',
        type: 'password',
        value: '',
        validation: passwordRule,
    },
    newPassword: {
        name: 'new_password',
        label: 'New password',
        placeholder: 'New password',
        type: 'password',
        value: '',
        validation: passwordRule,
    },
    repeatPassword: {
        name: 'repeat_password',
        label: 'Repeat password',
        placeholder: 'Repeat new password',
        type: 'password',
        value: '',
        validation: passwordRule,
    },
    linkCancel: {
        text: 'Cancel',
        href: '/profile',
    },
    buttonSave: {
        id: 'btn-edit-password',
        value: 'Save',
    },
};

export default class PasswordEdit extends Block {
    constructor() {
        super({
            profilePhoto: profilePhoto(),
            linkCancel: new Link(profileData.linkCancel),
            oldPassword: new Input(profileData.oldPassword),
            newPassword: new Input(profileData.newPassword),
            repeatPassword: new Input(profileData.repeatPassword),
            buttonSave: new Button(
                {
                    ...profileData.buttonSave, events: {
                        click: () => {
                            const formEdit = document.getElementById('form-edit-password') as HTMLFormElement;
                            const data = new FormData(formEdit);
                            const result = {
                                oldPassword: data.get('old_password'),
                                newPassword: data.get('new_password'),
                            }
                            console.log(result);
                        }
                    }
                }
            ),
        });
    }

    render() {
        return this.compile(passwordEdit, this.props);
    }
}