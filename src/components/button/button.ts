import Handlebars from 'handlebars';
import button from './Button.hbs';

Handlebars.registerPartial('button', button);
export default (id: string, value: string) => {
    return button({ id, value })
}
