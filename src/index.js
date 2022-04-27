import authorization from "./pages/authorization/authorization";
import registration from "./pages/registration/registration";
import error from "./pages/error/error";
import '../static/scss/index.scss';
import '../static/scss/variable.scss';
import "./components/input/input.scss";
import "./components/button/button.scss";
import "./components/link/link.scss";


const root = document.getElementById('root');
const currentPath = window.location.pathname;
if (currentPath === '/registration') {
    root.innerHTML = registration()
    return;
}
if (currentPath === '/authorization') {
    root.innerHTML = authorization()
    return;
} else if (currentPath === '/') {
    window.location = '/authorization'
    return;
} else {
    root.innerHTML = error('404', 'This page not found')
}
