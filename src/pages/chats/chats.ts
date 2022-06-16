import chats from './Chats.hbs';
import './chats.scss ';
import Block from '../../utils/block/block';
import ButtonCircle from '../../components/button/button-circle/button-circle';
import { chatsAPI } from '../../api/user/chats';
import { ChatsType } from "./types";
import menuControl from './components/menu-control';
import { Router } from "../../utils/router/router";

const chatsData: ChatsType = {
    buttonSend: {
        id: 'send-message-btn',
    },
    activeChat: {},
    //     {
    //     messages: [
    //         { text: 'hello', time: '12:32', isYouSender: true },
    //         { text: 'helfdsfdsflo', time: '12:32', isYouSender: false },
    //         { text: 'helldsfdsfdso', time: '12:32', isYouSender: true },
    //         { text: 'hegh  nrthrthrt   llo', time: '12:32', isYouSender: true },
    //         {
    //             text: 'helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo helregrebgre fbhregreb regregbrfb regreglo',
    //             time: '12:32',
    //             isYouSender: false
    //         }
    //     ],
    //     name: 'Nastya'
    // },
    chats: [{
        avatar: null,
        created_by: 37765,
        id: 331,
        last_message: null,
        title: "Иван Иванович",
        unread_count: 0
    }]
};

export default class Chats extends Block {
    controller: chatsAPI;
    router: Router;

    constructor() {
        super({
            chats: chatsData.chats,
            activeChat: chatsData.activeChat,
            menuControl: new menuControl({
                events: {
                    click: () => {
                        this.router.go('/profile');
                    }
                }
            }),
            buttonCircle: new ButtonCircle(
                {
                    ...chatsData.buttonSend, events: {
                        click: () => {
                            const inputMessage = document.getElementById('message-text') as HTMLInputElement;
                            if (inputMessage?.value.trim().length > 0)
                                console.log({
                                    message: inputMessage.value.trim()
                                })
                        }
                    }
                })
        });
        this.controller = new chatsAPI();
        this.router = new Router();
    }

    async getChats() {
        const response = await this.controller.getChats();
        if (response) {
            chatsData.chats = response;
            this.setProps({ chats: chatsData.chats });
        }

    }

    render() {
        return this.compile(chats, this.props);
    }
}
