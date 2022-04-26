import tpl from './index.hbs'
import authorization from "./pages/authorization/authorization";
import button from "./components/button/Button.hbs";

document.getElementById('root').innerHTML = tpl({
    authorization: authorization('btn1', 'Click this'),
    btn: button('btn1', 'Click this')
})

window.createButton = (id, value) => {
    const htmlTpl = document.createElement('template');
    htmlTpl.innerHTML = authorization(id, value);
    document.getElementById('root').appendChild(htmlTpl.content);
}