import Handlebars from 'handlebars';
import input from './Input.hbs';
import './input.scss';

Handlebars.registerPartial('input', input);
export default (label, placeholder, name, type, value) => {
    return input({ label, placeholder, name, type, value });
}
