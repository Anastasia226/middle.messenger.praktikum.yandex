import Handlebars from "handlebars";
import error from './Error.hbs';
import link from "../../components/link/Link.hbs";
import './error.scss'

const errorData = {
    link: {
        text: `Come back`,
        href: '/authorization',
        icon: '->',
    }
}

Handlebars.registerPartial('error', error);
export default (statusError: string, messageError: string) => {
    return error({ statusError, messageError, link: link(errorData.link), })
}