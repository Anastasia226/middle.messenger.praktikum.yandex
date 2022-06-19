import Handlebars from 'handlebars';
import chats from './Chats.hbs';
import './chats.scss ';


const chatsData = {
    chats: [
        {
            photoSrc: '',
            name: 'Sasha',
            message: 'Hi',
            date: '13:15',
        },
        {
            photoSrc: '',
            name: 'Nastya',
            message: 'Helloo',
            date: '27.03.2021',
        },
        {
            photoSrc: '',
            name: 'Katya',
            message: 'Hello',
            date: '26.03.2021',
        },
        {
            photoSrc: '',
            name: 'Olya',
            message: 'Hello',
            date: '25.03.2021',
        }
    ]
};

Handlebars.registerPartial('chats', chats);
export default () => {
    return chats({
        chats: chatsData.chats,
    });
}