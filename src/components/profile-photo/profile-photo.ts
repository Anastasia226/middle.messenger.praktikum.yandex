import Handlebars from 'handlebars';
import profilePhoto from './ProfilePhoto.hbs';

Handlebars.registerPartial('profilePhoto', profilePhoto);
export default (src: string) => {
    return profilePhoto({ src });
}
