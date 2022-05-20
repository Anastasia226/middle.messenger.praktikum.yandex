import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './profile.scss';
import Block from "../../services/block";
import Link from "../../components/link/link";
import profile from './Profile.hbs';

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
        href: '/profile-edit',
    },
    linkPassword: {
        text: 'Edit password',
        href: '/password-edit',
    },
    logOut: {
        text: 'Exit',
        href: '/authorization',
    },
};


export default class ProfileEdit extends Block {
    constructor() {
        super({
            linkProfile: new Link(profileData.linkProfile),
            linkPassword: new Link(profileData.linkPassword),
            logOut: new Link(profileData.logOut),
            profilePhoto: profilePhoto(),
            fields: profileData.fields,
        });
    }

    render() {
        return this.compile(profile, this.props);
    }
}
