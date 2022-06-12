import profilePhoto from '../../components/profile-photo/ProfilePhoto.hbs';
import './profile.scss';
import Block from "../../utils/block/block";
import Link from "../../components/link/link";
import profile from './Profile.hbs';
import store, { StoreEvents } from '../../utils/store/store';
import { Router } from "../../utils/router/router";

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
    },
    linkPassword: {
        text: 'Edit password',
    },
    logOut: {
        text: 'Exit',
        href: '/authorization',
    },
};


export default class ProfileEdit extends Block {
    router: Router;

    constructor() {
        super({
            linkProfile: new Link({
                ...profileData.linkProfile,
                events: {
                    click: () => {
                        this.router.go('/profile-edit');
                    },
                }
            }),
            linkPassword: new Link({
                ...profileData.linkPassword,
                events: {
                    click: () => {
                        this.router.go('/password-edit');
                    },
                }
            }),
            logOut: new Link({
                ...profileData.logOut, events: {
                    click: () => {
                        this.router.go('/authorization');
                    },
                }
            }),
            profilePhoto: profilePhoto(),
            fields: profileData.fields,
        });
        store.on(StoreEvents.Updated, () => {
            // вызываем обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });
        this.router = new Router();
    }

    render() {
        return this.compile(profile, this.props);
    }
}
