import Handlebars from 'handlebars';
import button from './Button.hbs';
import authorization from "../../pages/authorization/authorization.hbs";


console.log(button)
Handlebars.registerPartial('button', button);
export default (id, value) => {
    return button({id, value})
}
