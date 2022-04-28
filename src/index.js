import authorization from './pages/authorization/authorization';
import registration from './pages/registration/registration';
import profile from './pages/profile/profile';
import error from './pages/error/error';
import '../static/scss/index.scss';
import '../static/scss/variable.scss';
import './components/input/input.scss';
import './components/button/button.scss';
import './components/link/link.scss';
import './components/profile-photo/profile-photo.scss';


const root = document.getElementById('root');
const currentPath = window.location.pathname;
console.log(currentPath);
if (currentPath === '/registration') {
    console.log(currentPath);
    root.innerHTML = registration();
    return;
} else if (currentPath === '/authorization') {
    root.innerHTML = authorization();
    return;
} else if (currentPath === '/profile') {
    root.innerHTML = profile();
    return;
} else if (currentPath === '/') {
    window.location = '/authorization';
    return;
} else {
    root.innerHTML = error('404', 'This page not found');
}
