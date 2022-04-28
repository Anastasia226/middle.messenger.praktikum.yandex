import Handlebars from 'handlebars';
import profileEdit from './ProfileEdit.hbs';
import link from '../../components/link/Link.hbs';
import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './profile-edit.scss';
import input from '../../components/input/Input.hbs';
import button from '../../components/button/Button.hbs';

const profileData = {
    email: {
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        type: 'email',
        value: 'bagaeva@yandex.ru'
    },
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        value: 'anastasia.226',
    },
    firstName: {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        value: 'Anastasiia',
    },
    lastName: {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        value: 'Bagaeva',
    },
    telephone: {
        name: 'telephone',
        label: 'Telephone',
        placeholder: 'Telephone',
        type: 'tel',
        value: '89224411823',
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

Handlebars.registerPartial('profileEdit', profileEdit);
export default () => {
    return profileEdit({
        linkCancel: link(profileData.linkCancel),
        profilePhoto: profilePhoto(),
        buttonSave: button(profileData.buttonSave),
        email: input(profileData.email),
        login: input(profileData.login),
        firstName: input(profileData.firstName),
        lastName: input(profileData.lastName),
        telephone: input(profileData.telephone),
    });
}