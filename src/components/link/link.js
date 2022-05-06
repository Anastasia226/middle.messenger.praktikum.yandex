import Handlebars from 'handlebars';
import link from './Link.hbs';

Handlebars.registerPartial('link', link);
export default (text, href, icon) => {
    return link({text, href, icon});
}
