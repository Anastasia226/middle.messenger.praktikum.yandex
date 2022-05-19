import Handlebars from 'handlebars';
import chats from './Chats.hbs';
import './chats.scss ';

const chatsData = {
    activeChat: {
        messages: [
            { text: 'hello', time: '12:32', isYouSender: true },
            { text: 'helfdsfdsflo', time: '12:32', isYouSender: false },
            { text: 'helldsfdsfdso', time: '12:32', isYouSender: true },
            { text: 'hegh  nrthrthrt   llo', time: '12:32', isYouSender: true },
            {
                text: 'helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo',
                time: '12:32',
                isYouSender: false
            }
        ],
        name: 'Nastya'
    },
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
        activeChat: chatsData.activeChat
    });
}