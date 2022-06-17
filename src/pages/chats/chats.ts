import chats from './Chats.hbs';
import './chats.scss ';
import Block from '../../utils/block/block';
import { chatsAPI } from '../../api/user/chats';
import { ChatsType } from "./types";
import menuControl from './components/menu-control/menu-control';
import { Router } from "../../utils/router/router";
import store from "../../utils/store/store";
import { getAvatar, getDataToChats } from "./helpers";
import Link from "../../components/link/link";
import itemChat from "./components/item-chat/item-chat";
import currentChat from "./components/current-chat/current-chat";

const chatsData: ChatsType = {
    addChat: {
        text: 'Add new chat + ',
    },
    chats: []
};

export default class Chats extends Block {
    controller: chatsAPI;
    router: Router;

    constructor() {
        super({
            chats: new itemChat(),
            currentChat: new currentChat(),
            avatarProfile: '',
            menuControl: new menuControl({
                events: {
                    click: () => {
                        this.router.go('/profile');
                    }
                }
            }),

            addChat: new Link({
                ...chatsData.addChat, events: {
                    click: () => {
                        const title = prompt('Please enter chat name')
                        if (title) {
                            this.controller.createChat({ title }).then(() => {
                                this.updateChats()
                            })
                        }
                    },
                }
            }),
        });
        this.controller = new chatsAPI();
        this.router = new Router();
        const { user } = store.getState();
        this.setProps({ avatarProfile: getAvatar(user.avatar as string) });
        this.updateChats();
    }

    updateChats() {
        this.controller.getChats().then((response) => {
            const chatsResponse = getDataToChats(response);
            store.set('chats', chatsResponse)
        })
    }

    render() {
        return this.compile(chats, this.props);
    }
}

