import Handlebars from 'handlebars';
import passwordEdit from './PasswordEdit.hbs';
import link from '../../components/link/Link.hbs';
import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './password-edit.scss';
import input from '../../components/input/Input.hbs';
import button from '../../components/button/Button.hbs';

const profileData = {
    oldPassword: {
        name: 'old_password',
        label: 'Old password',
        placeholder: 'Old password',
        type: 'password',
        value: ''
    },
    newPassword: {
        name: 'new_password',
        label: 'New password',
        placeholder: 'New password',
        type: 'password',
        value: ''
    },
    repeatPassword: {
        name: 'repeat_password',
        label: 'Repeat password',
        placeholder: 'Repeat new password',
        type: 'password',
        value: ''
    },
    linkCancel: {
        text: 'Cancel',
        href: '/profile',
    },
    buttonSave: {
        id: 'btn-save',
        value: 'Save',
    },
};

Handlebars.registerPartial('passwordEdit', passwordEdit);
export default () => {
    return passwordEdit({
        profilePhoto: profilePhoto(),
        linkCancel: link(profileData.linkCancel),
        buttonSave: button(profileData.buttonSave),
        oldPassword: input(profileData.oldPassword),
        newPassword: input(profileData.newPassword),
        repeatPassword: input(profileData.repeatPassword),
    });
}