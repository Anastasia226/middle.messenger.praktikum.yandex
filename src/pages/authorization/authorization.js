import Handlebars from "handlebars";
import authorization from './authorization.hbs';
import button from "../../components/button/Button.hbs";

Handlebars.registerPartial('authorization', authorization);
export default () => {
    return authorization()
}