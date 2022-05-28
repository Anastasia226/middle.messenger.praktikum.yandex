import Authorization from './pages/authorization/authorization';
import Registration from './pages/registration/registration';
import Profile from './pages/profile/profile';
import ErrorPage from './pages/error/error';
import ProfileEdit from './pages/profile-edit/profile-edit';
import PasswordEdit from './pages/password-edit/password-edit';
import Chats from './pages/chats/chats';

import './assets/scss/index.scss';
import './components/input/input.scss';
import './components/button/button.scss';
import './components/link/link.scss';
import './components/profile-photo/profile-photo.scss';
import { render } from './utils/render/render';
import Block from './utils/block/block';


const root = document.getElementById('root');
const currentPath = window.location.pathname;
if (root) {
    let content: Block;
    switch (currentPath) {
        case '/registration':
            content = new Registration();
            render(root, content);
            break;
        case '/authorization':
            content = new Authorization();
            render(root, content);
            break;
        case '/profile':
            content = new Profile();
            render(root, content);
            break;
        case '/profile-edit':
            content = new ProfileEdit();
            render(root, content);
            break;
        case '/password-edit':
            content = new PasswordEdit();
            render(root, content);
            break;
        case '/chats':
            content = new Chats();
            render(root, content);
            break;
        case '/':
            content = new Authorization();
            render(root, content);
            break;
        default:
            content = new ErrorPage({ statusError: '404', messageError: 'This page not found' });
            render(root, content);
    }
}