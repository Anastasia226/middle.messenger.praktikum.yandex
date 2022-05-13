import Handlebars from 'handlebars';
import input from './Input.hbs';
import './input.scss';

Handlebars.registerPartial('input', input);
export default (data: { label: string, placeholder: string, name: string, type: string, value: string }) => {
    return input(data);
}
