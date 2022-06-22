import './profile.scss';
import Block from '../../utils/block/block';
import Link from '../../components/link/link';
import profile from './Profile.hbs';
import store, { StoreEvents } from '../../utils/store/store';
import { Router } from '../../utils/router/router';
import { userAPI } from '../../api/user/user-login';
import { getAvatar } from '../chats/helpers';

const profileData = {
  fields: [],
  linkProfile: {
    text: 'Edit profile',
  },
  linkPassword: {
    text: 'Edit password',
  },
  linkToChats: {
    text: '<-- Back to chats',
  },
  logOut: {
    text: 'Exit',
  },
};

export default class ProfileEdit extends Block {
  router: Router;

  controller: userAPI;

  fields: Array<{ name: string, value: string }> = [];

  constructor() {
    super({
      linkProfile: new Link({
        ...profileData.linkProfile,
        events: {
          click: () => {
            this.router.go('/profile-edit');
          },
        },
      }),
      linkPassword: new Link({
        ...profileData.linkPassword,
        events: {
          click: () => {
            this.router.go('/password-edit');
          },
        },
      }),
      linkToChats: new Link({
        ...profileData.linkToChats,
        events: {
          click: () => {
            this.router.go('/messenger');
          },
        },
      }),
      logOut: new Link({
        ...profileData.logOut,
        events: {
          click: async () => {
            const response = await this.controller.logOut();
            if (response) {
              store.reset();
              this.router.go('/authorization');
            }
          },
        },
      }),
      avatarProfile: '',
      fields: [],
    });
    this.router = new Router();
    this.controller = new userAPI();
    this.updateProfile();
    store.on(StoreEvents.UpdatedUser, () => {
      this.updateProfile();
    });
  }

  updateProfile() {
    const { user } = store.getState();
    this.setProps({ avatarProfile: getAvatar(user?.avatar as string) });
    this.fields = [
      {
        name: 'Email',
        value: user?.email as string,
      },
      {
        name: 'Login',
        value: user?.login as string,
      },
      {
        name: 'FirstName',
        value: user?.first_name as string,
      },
      {
        name: 'LastName',
        value: user?.second_name as string,
      },
      {
        name: 'Telephone',
        value: user?.phone as string,
      },
    ];
    this.setProps({ fields: this.fields });
  }

  render() {
    return this.compile(profile, this.props);
  }
}
