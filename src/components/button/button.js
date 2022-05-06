import Handlebars from 'handlebars';
import button from './Button.hbs';

Handlebars.registerPartial('button', button);
export default (id, value) => {
    return button({id, value})
}
