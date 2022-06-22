import passwordEdit from './PasswordEdit.hbs';
import './password-edit.scss';
import Block from '../../utils/block/block';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import { passwordRule } from '../../const/regex';
import { Router } from '../../utils/router/router';
import { userSettingsAPI } from '../../api/user/user';
import store, { StoreEvents } from '../../utils/store/store';
import { getAvatar } from '../chats/helpers';

const profileData = {
  oldPassword: {
    name: 'old_password',
    label: 'Old password',
    placeholder: 'Old password',
    type: 'password',
    value: '',
    validation: passwordRule,
  },
  newPassword: {
    name: 'new_password',
    label: 'New password',
    placeholder: 'New password',
    type: 'password',
    value: '',
    validation: passwordRule,
  },
  linkCancel: {
    text: 'Cancel',
  },
  buttonSave: {
    id: 'btn-edit-password',
    value: 'Save',
  },
};

export default class PasswordEdit extends Block {
  router: Router;

  controller: userSettingsAPI;

  constructor() {
    super({
      avatarProfile: '',
      linkCancel: new Link({
        ...profileData.linkCancel,
        events: {
          click: () => {
            this.router.go('/profile');
          },
        },
      }),
      oldPassword: new Input(profileData.oldPassword),
      newPassword: new Input(profileData.newPassword),
      buttonSave: new Button(
        {
          ...profileData.buttonSave,
          events: {
            click: () => {
              const formEdit = document.getElementById('form-edit-password') as HTMLFormElement;
              const data = new FormData(formEdit);
              const result = {
                oldPassword: data.get('old_password'),
                newPassword: data.get('new_password'),
              };
              this.controller.updatePassword(result).then(() => {
                this.router.go('/profile');
              });
            },
          },
        },
      ),
    });
    this.router = new Router();
    this.controller = new userSettingsAPI();
    this.updateProfileAvatar();
    store.on(StoreEvents.UpdatedUser, () => {
      this.updateProfileAvatar();
    });
  }

  updateProfileAvatar() {
    const { user } = store.getState();
    this.setProps({ avatarProfile: getAvatar(user?.avatar as string) });
  }

  render() {
    return this.compile(passwordEdit, this.props);
  }
}
