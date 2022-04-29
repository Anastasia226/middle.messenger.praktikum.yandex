import Handlebars from 'handlebars';
import chats from './Chats.hbs';
import itemChat from '../../components/item-chat/ItemChat.hbs';
import button from '../../components/button/Button.hbs';
import link from '../../components/link/Link.hbs';
import './chats.scss ';


const chatsData = {
    chat: {
        photoSrc: '',
        name: 'Nastya',
        message: 'Hello',
        date: '28.03.2021',
    },
    chats: [
        {
            photoSrc: '',
            name: 'Nastya',
            message: 'Hello',
            date: '28.03.2021',
        },
        {
            photoSrc: '',
            name: 'Nastya',
            message: 'Hello',
            date: '28.03.2021',
        },
        {
            photoSrc: '',
            name: 'Nastya',
            message: 'Hello',
            date: '28.03.2021',
        }
    ]
};

Handlebars.registerPartial('chats', chats);
console.log(itemChat(chatsData.chat));
export default () => {
    return chats({
        itemChat: itemChat(chatsData.chat)
    });
}