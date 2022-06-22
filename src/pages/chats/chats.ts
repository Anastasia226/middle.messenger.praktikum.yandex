import chats from './Chats.hbs';
import './chats.scss';
import Block from '../../utils/block/block';
import { chatsAPI } from '../../api/chat/chats';
import menuControl from './components/menu-control/menu-control';
import { Router } from '../../utils/router/router';
import store, { StoreEvents } from '../../utils/store/store';
import { getAvatar, getDataToChats } from './helpers';
import Link from '../../components/link/link';
import itemChat from './components/item-chat/item-chat';
import currentChat from './components/current-chat/current-chat';

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
          },
        },
      }),

      addChat: new Link({
        text: 'Add new chat + ',
        events: {
          click: () => {
            const title = prompt('Please enter chat name');
            if (title) {
              this.controller.createChat({ title })
                .then(() => {
                  this.updateChats();
                });
            }
          },
        },
      }),
    });
    this.controller = new chatsAPI();
    this.router = new Router();
    this.updateProfileAvatar();
    this.updateChats();
    store.on(StoreEvents.UpdatedUser, () => {
      this.updateProfileAvatar();
    });
  }

  updateChats() {
    this.controller.getChats()
      .then((response) => {
        const chatsResponse = getDataToChats(response);
        store.set('chats', chatsResponse);
        store.emit(StoreEvents.UpdatedChats);
      });
  }

  updateProfileAvatar() {
    const { user } = store.getState();
    this.setProps({ avatarProfile: getAvatar(user?.avatar as string) });
  }

  render() {
    return this.compile(chats, this.props);
  }
}
