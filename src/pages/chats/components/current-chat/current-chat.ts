import CurrentChat from './CurrentChat.hbs';
import Block from '../../../../utils/block/block';
import ButtonCircle from '../../../../components/button/button-circle/button-circle';
import store, { StoreEvents } from '../../../../utils/store/store';
import Link from '../../../../components/link/link';
import { chatsAPI } from '../../../../api/chat/chats';
import { userSettingsAPI } from '../../../../api/user/user';
import InputFile from '../../../../components/input-file/input-file';
import messagesController from '../../controller/messages-controller';

export default class currentChat extends Block {
  controller: chatsAPI;

  userController: userSettingsAPI;

  constructor() {
    super({
      activeChat: null,
      usersChat: null,
      avatarChat: '',
      messages: [],
      inputFile: new InputFile({
        events: {
          change: () => {
            const myUserForm = document.getElementById('myUserForm') as HTMLFormElement;
            const form = new FormData(myUserForm);
            const { chatId } = store.getState();
            form.append('chatId', String(chatId));
            this.controller.updateChatAvatar(form).then(() => {
              alert('Avatar chat changed ');
            });
          },
        },
      }),
      addUser: new Link({
        text: 'Add user +',
        events: {
          click: async () => {
            const login = prompt('Please enter user login');
            const { chatId } = store.getState();
            const users = await this.userController.searchUser({ login });
            if (users) {
              const searchUser = users.find((user) => user.login === login);
              if (searchUser) {
                this.controller.addUserToChat({ chatId, users: [searchUser.id] }).then(() => {
                  alert(`${searchUser.first_name} ${searchUser.second_name} was added`);
                  this.controller.getChatUsers(chatId).then((response) => {
                    const usersChat = response?.map((user) => `${user.first_name} ${user.second_name}`).join(',');
                    store.set('usersChat', usersChat);
                  });
                });
              } else {
                alert('User not found');
              }
            }
          },
        },
      }),
      buttonCircle: new ButtonCircle(
        {
          id: 'send-message-btn',
          events: {
            click: () => {
              const inputMessage = document.getElementById('message-text') as HTMLInputElement;
              if (inputMessage?.value.trim().length > 0) messagesController.sendMessage(inputMessage.value.trim());
            },
          },
        },
      ),
    });
    this.controller = new chatsAPI();
    this.userController = new userSettingsAPI();
    store.on(StoreEvents.UpdatedUser, () => {
      this.updateCurrentChat();
    });
    store.on(StoreEvents.UpdatedMessages, () => {
      this.updateMessages();
    });
  }

  updateCurrentChat() {
    const { activeChat, usersChat } = store.getState();
    this.setProps({ activeChat, usersChat, avatarChat: activeChat?.avatar });
  }

  updateMessages() {
    const { messages } = store.getState();
    this.setProps({ messages });
  }

  render() {
    return this.compile(CurrentChat, this.props);
  }
}
