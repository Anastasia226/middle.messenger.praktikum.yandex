import ItemChat from './ItemChat.hbs';
import Block from '../../../../utils/block/block';
import { chatsAPI } from "../../../../api/user/chats";
import store, { StoreEvents } from "../../../../utils/store/store";
import { MessagesAPI } from "../../../../api/messages/messages_api";


export default class itemChat extends Block {
    controller: chatsAPI;

    constructor() {
        super({
            chatsList: [],
            events: {
                click: (event: Event) => {
                    const id = ((event.target as HTMLElement).getAttribute('value'))
                    if (id) {
                        this.controller.getChatToken(id).then((response) => {
                            const token = response?.token;
                            store.set('tokenChat', token)
                            store.set('idChat', id)
                            //  const ar = new MessagesAPI(token, id, id,); подключаем ws
                        })
                    }
                }
            }
        });
        this.controller = new chatsAPI();
        this.updateChats();
        store.on(StoreEvents.UpdatedUser, () => {
            this.updateChats()
        });
    }

    updateChats() {
        const { chats } = store.getState()
        this.setProps({ chatsList: chats });
    }

    render() {
        return this.compile(ItemChat, this.props);
    }
}
