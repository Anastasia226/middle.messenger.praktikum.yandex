import Handlebars from 'handlebars';
import chats from './Chats.hbs';
import input from '../../components/input/Input.hbs';
import button from '../../components/button/Button.hbs';
import link from '../../components/link/Link.hbs';
import './chats.scss ';


const chatsData = {};

Handlebars.registerPartial('chats', chats);
export default () => {
    return chats({});
}