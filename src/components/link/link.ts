import Handlebars from 'handlebars';
import link from './Link.hbs';

Handlebars.registerPartial('link', link);
export default (data: { text: string, href: string, icon: string }) => {
    return link(data);
}
