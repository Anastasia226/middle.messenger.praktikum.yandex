import Authorization from './pages/authorization/authorization';
import Registration from './pages/registration/registration';
import Profile from './pages/profile/profile';
import ErrorPage from './pages/error/error';
import ProfileEdit from './pages/profile-edit/profile-edit';
import PasswordEdit from './pages/password-edit/password-edit';
import Chats from './pages/chats/chats';
import { Router } from './utils/router/router';

import './assets/scss/index.scss';
import './components/input/input.scss';
import './components/button/button.scss';
import './components/link/link.scss';
import './components/profile-photo/profile-photo.scss';
import { userAPI } from "./api/user/user-login";
import store from "./utils/store/store";


const router = new Router('#root');

async function isUserLogin() {
    const controller = new userAPI();
    await controller.getUser()


}

function main() {
    router
        .use('/', new Authorization())
        .use('/authorization', new Authorization())
        .use('/registration', new Registration())
        .use('/profile', new Profile())
        .use('/messenger', new Chats())
        .use('/profile-edit', new ProfileEdit())
        .use('/password-edit', new PasswordEdit())
        .use('/404', new ErrorPage({ statusError: '404', messageError: 'This page not found' }))
        .use('/500', new ErrorPage({ statusError: '500', messageError: 'Sorry... Page don\'t work.' }))
        .start();
}

isUserLogin()
    .then(() => {
        main()
    })
    .catch(() => {
        store.set('user', null)
        main()
    })
