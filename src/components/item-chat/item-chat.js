import Handlebars from 'handlebars';
import itemChat from './ItemChat.hbs';
import profilePhoto from '../profile-photo/ProfilePhoto.hbs';

Handlebars.registerPartial('itemChat', itemChat);
export default (photoSrc, name, message, date) => {
    return itemChat({ profilePhoto: profilePhoto(), });
}
