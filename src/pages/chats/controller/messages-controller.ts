import { EventBus } from '../../../utils/event-bus/event-bus';
import { MessagesAPI } from '../../../api/messages/messages_api';
import { SocketMessageResponse } from '../../../api/messages/types';
import store, { StoreEvents } from '../../../utils/store/store';
import { UsersChat } from '../types';
import { chatsAPI } from '../../../api/chat/chats';
import { getTime } from '../helpers';

const pingInterval = 60000;

export class MessagesController extends EventBus {
  static EVENTS: {};

  private controller?: MessagesAPI;

  private controllerChats: chatsAPI;

  private selected?: UsersChat;

  constructor() {
    super();
    this.controllerChats = new chatsAPI();
  }

  formattedData(message: SocketMessageResponse) {
    const { user } = store.getState();
    return {
      ...message,
      time: getTime(message.time),
      isYouSender: message.user_id === user?.id,
    };
  }

  getOldMessages(messages: SocketMessageResponse[]) {
    const messagesForStore = messages.map((message) => this.formattedData(message));
    store.set('messages', messagesForStore.reverse());
    store.emit(StoreEvents.UpdatedMessages);
  }

  getNewMessages(message: SocketMessageResponse) {
    let { messages } = store.getState();
    if (messages !== undefined) {
      messages.push(this.formattedData(message));
    } else {
      messages = [this.formattedData(message)];
    }
    store.set('messages', messages);
    store.emit(StoreEvents.UpdatedMessages);
  }

  openHandler() {
    console.log('Connection established');
    this.requestMessages();
    this.ping();
  }

  async closeHandler(event: CloseEvent) {
    if (!event.wasClean) {
      await this.open();
    }
  }

  messageHandler(event: MessageEvent) {
    const message = JSON.parse(event.data);
    if (Array.isArray(message)) {
      this.getOldMessages(message);
    } else if (message.type === 'message') {
      this.getNewMessages(message);
    } else {
      console.log(message);
    }
  }

  onErrorHandler(event: ErrorEvent) {
    console.log('Error', event.message);
  }

  async open(selected?: UsersChat) {
    this.close();
    if (selected !== undefined) {
      this.selected = selected;
    }
    if (this.selected === undefined) {
      throw new Error('You should select chat');
    }

    const { user } = store.getState();
    const { token } = await this.controllerChats.getChatToken(this.selected.id);

    if (token === undefined) {
      throw new Error('Token not received');
    }
    this.controller = new MessagesAPI(
      user.id,
      this.selected.id,
      token,
      {
        onOpen: this.openHandler.bind(this),
        onClose: this.closeHandler.bind(this),
        onMessage: this.messageHandler.bind(this),
        onError: this.onErrorHandler.bind(this),
      },
    );
  }

  close() {
    try {
      if (this.controller !== undefined) {
        this.controller.close();
        this.controller = undefined;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async requestMessages() {
    try {
      this.controller?.requestMessages(0);
    } catch (e) {
      console.log(e);
    }
  }

  sendMessage(message: string) {
    if (this.controller !== undefined) {
      this.controller.sendMessage(message);
      this.requestMessages();
    }
  }

  ping() {
    setTimeout(() => {
      try {
        this.controller?.ping();
        this.ping();
      } catch (e) {
        console.log(e);
      }
    }, pingInterval);
  }
}

export default new MessagesController();
