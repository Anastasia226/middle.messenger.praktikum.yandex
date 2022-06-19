import { EventBus } from "../../../utils/event-bus/event-bus";
import { MessagesAPI } from "../../../api/messages/messages_api";
import { SocketMessageResponse } from "../../../api/messages/types";
import store, { StoreEvents } from "../../../utils/store/store";
import { UsersChat } from '../types'
import { chatsAPI } from "../../../api/chat/chats";
import { getTime } from "../helpers";


export enum WebsocketEvents {
    PING_CONNECTED = "ping-connected",
    PING_DISCONNECTED = "ping-disconnected",
    OLD_MESSAGES = "received-old-messages",
    NEW_MESSAGE = "received-new-message"
}


const pingInterval = 60000

export class MessagesController extends EventBus {
    static EVENTS: {}
    private controller?: MessagesAPI
    private controllerChats: chatsAPI
    private selected?: UsersChat

    constructor() {
        super();
        this.controllerChats = new chatsAPI();
    }

    formattedData(message: SocketMessageResponse) {
        return {
            ...message,
            time: getTime(message.time)
        }
    }

    getOldMessages(messages: SocketMessageResponse[]) {
        const messagesForStore = messages.map((message) => this.formattedData(message))
        store.set('messages', messagesForStore.reverse())
        store.emit(StoreEvents.UpdatedMessages);
    }

    getNewMessages(message: SocketMessageResponse) {
        let { messages } = store.getState();
        if (messages !== undefined) {
            messages.push(this.formattedData(message))
        } else {
            messages = [this.formattedData(message)]
        }
        store.set('messages', messages)
        store.emit(StoreEvents.UpdatedMessages);
    }

    onOpenHandler() {
        console.log("Соединение установлено")
        this.requestMessages()
        this.ping()
    }

    async onCloseHandler(event: CloseEvent) {
        if (event.wasClean) {
            console.log("Соединение закрыто чисто")
        } else {
            console.log("Обрыв соединения. Пробуем переподключиться")
            await this.open()
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    }

    onMessageHandler(event: MessageEvent) {
        const message = JSON.parse(event.data)
        if (Array.isArray(message)) {
            this.getOldMessages(message)
        } else if (message.type === "message") {
            this.getNewMessages(message);
        } else {
            console.log(message)
        }
    }

    onErrorHandler(event: ErrorEvent) {
        console.log("Ошибка", event.message)
    }

    async open(selected?: UsersChat) {
        this.close()
        if (selected !== undefined) {
            this.selected = selected
        }

        if (this.selected === undefined) {
            throw new Error(
                "Can not open connection if no SideChat was selected"
            )
        }
        const { user } = store.getState();

        const { token } = await this.controllerChats.getChatToken(this.selected.id)

        if (token === undefined) {
            console.log("Can not receive token. Connection has not been opened")
            return
        }
        this.controller = new MessagesAPI(
            user.id,
            this.selected.id,
            token,
            {
                onOpen: this.onOpenHandler.bind(this),
                onClose: this.onCloseHandler.bind(this),
                onMessage: this.onMessageHandler.bind(this),
                onError: this.onErrorHandler.bind(this)
            }
        )
    }

    close() {
        try {
            if (this.controller !== undefined) {
                this.controller.close()
                this.controller = undefined
            }
        } catch (e) {
            console.log(e)
        }
    }

    async requestMessages() {
        try {
            this.controller?.requestMessages(0)
        } catch (e) {
            console.log(e)
        }
    }

    sendMessage(message: string) {
        try {
            if (this.controller !== undefined) {
                this.controller.sendMessage(message)
                this.requestMessages()
            } else {
                throw new Error(
                    "You must open new connection to use this socket"
                )
            }
        } catch (e) {
            console.log(e)
        }
    }

    ping() {
        setTimeout(() => {
            try {
                this.controller?.ping()
                this.ping();
            } catch (e) {
                console.log(e)
            }
        }, pingInterval)
    }

}

export default new MessagesController()
