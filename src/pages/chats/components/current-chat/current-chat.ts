import CurrentChat from './CurrentChat.hbs';
import Block from '../../../../utils/block/block';
import ButtonCircle from "../../../../components/button/button-circle/button-circle";
import store, { StoreEvents } from "../../../../utils/store/store";
import { MessagesAPI } from "../../../../api/messages/messages_api";

export default class currentChat extends Block {
    constructor() {
        super({
            activeChat: null,
            buttonCircle: new ButtonCircle(
                {
                    id: 'send-message-btn',
                    events: {
                        click: () => {
                            const inputMessage = document.getElementById('message-text') as HTMLInputElement;
                            if (inputMessage?.value.trim().length > 0)
                                console.log({
                                    message: inputMessage.value.trim()
                                })
                        }
                    }
                }),
        });
        store.on(StoreEvents.UpdatedUser, () => {
            this.updateCurrentChat()
        });
    }

    updateCurrentChat() {
        // this.setProps({ activeChat: currentChat });
    }

    render() {
        return this.compile(CurrentChat, this.props);
    }
}
