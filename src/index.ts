import authorization from './pages/authorization/authorization';
import registration from './pages/registration/registration';
import profile from './pages/profile/profile';
import error from './pages/error/error';
import profileEdit from './pages/profile-edit/profile-edit';
import passwordEdit from './pages/password-edit/password-edit';
import chats from './pages/chats/chats';
import '../static/scss/index.scss';

import './components/input/input.scss';
import './components/button/button.scss';
import './components/link/link.scss';
import './components/profile-photo/profile-photo.scss';

import { useSendMessage } from './utils/use/useSendMessage';
import { useRegistration } from './utils/use/useRegistration';
import { useAuthorization } from './utils/use/useAuthorization';
import { useEditProfile } from './utils/use/useEditProfile';
import { useEditPassword } from './utils/use/useEditPassword';

const root = document.getElementById('root');
const currentPath = window.location.pathname;
if (root) {
    if (currentPath === '/registration') {
        root.innerHTML = registration();
    } else if (currentPath === '/authorization') {
        root.innerHTML = authorization();
    } else if (currentPath === '/profile') {
        root.innerHTML = profile();
    } else if (currentPath === '/profile-edit') {
        root.innerHTML = profileEdit();
    } else if (currentPath === '/password-edit') {
        root.innerHTML = passwordEdit();
    } else if (currentPath === '/chats') {
        root.innerHTML = chats();
    } else if (currentPath === '/') {
        root.innerHTML = authorization();
    } else {
        root.innerHTML = error('404', 'This page not found');
    }
}

useSendMessage();
useRegistration();
useAuthorization();
useEditProfile();
useEditPassword();