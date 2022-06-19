import ItemChat from './ItemChat.hbs';
import Block from '../../../../utils/block/block';
import { chatsAPI } from "../../../../api/chat/chats";
import store, { StoreEvents } from "../../../../utils/store/store";
import messagesController from "../../controller/messages-controller";
import { ChatType, UsersChat } from "../../types";


export default class itemChat extends Block {
    controller: chatsAPI;

    constructor() {
        super({
            chatsList: [],
            events: {
                click: (event: Event) => {
                    const id = ((event.target as HTMLElement).getAttribute('value'))
                    if (id) {
                        const { chats } = store.getState();
                        const selectedChat = chats.find((chat: UsersChat) => chat.id === Number(id));
                        messagesController.open(selectedChat);
                        store.set('chatId', id);
                        const chat = (chats as ChatType[]).find((item) => item.id === Number(id));
                        store.set('activeChat', chat);
                        this.controller.getChatUsers(id).then((response) => {
                            const usersChat = response?.map((user) => `${user.first_name} ${user.second_name}`).join(',');
                            store.set('usersChat', usersChat);
                        })
                    }
                }
            }
        });
        this.controller = new chatsAPI();
        this.updateChats();
        store.on(StoreEvents.UpdatedChats, () => {
            this.updateChats();
        });
    }

    updateChats() {
        const { chats } = store.getState();
        console.log(store.getState());
        this.setProps({ chatsList: chats });
    }

    render() {
        return this.compile(ItemChat, this.props);
    }
}
