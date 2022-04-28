import Handlebars from 'handlebars';
import profile from './Profile.hbs';
import link from '../../components/link/Link.hbs';
import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './profile.scss';

const profileData = {
    fields: [
        {
            name: 'Email',
            value: 'bagaeva@yandex.ru'
        },
        {
            name: 'Login',
            value: 'anastasia.226',
        },
        {
            name: 'FirstName',
            value: 'Anastasiia',
        },
        {
            name: 'LastName',
            value: 'Bagaeva',
        },
        {
            name: 'Telephone',
            value: '89224411823',
        },
    ],
    linkProfile: {
        text: 'Edit profile',
        href: '/edit-profile',
    },
    linkPassword: {
        text: 'Edit password',
        href: '/edit-password',
    },
    logOut: {
        text: 'Exit',
        href: '/authorization',
    },
};

Handlebars.registerPartial('profile', profile);
export default () => {
    return profile({
        linkProfile: link(profileData.linkProfile),
        linkPassword: link(profileData.linkPassword),
        logOut: link(profileData.logOut),
        profilePhoto: profilePhoto(),
        fields: profileData.fields,
    });
}