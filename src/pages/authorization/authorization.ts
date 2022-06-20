import authorization from './Authorization.hbs';
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Link from "../../components/link/link";
import './authorization.scss '
import Block from '../../utils/block/block';
import { loginRule, passwordRule } from '../../const/regex';
import { Router } from '../../utils/router/router';
import { userAPI } from "../../api/user/user-login";
import { chatsAPI } from "../../api/chat/chats";
import store, { StoreEvents } from '../../utils/store/store';
import { getDataToChats } from "../chats/helpers";

const authorizationData = {
    login: {
        name: 'login',
        label: 'Login',
        placeholder: 'Login',
        type: 'text',
        validation: loginRule,
    },
    password: {
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        type: 'password',
        validation: passwordRule,
    },
    button: {
        id: 'btn-authorization',
        value: 'Enter',
    },
    link: {
        text: 'No account?',
        href: '/registration',
    }
}

interface PropsType {
    login: Block;
    password: Block;
    btnEnter: Block;
    link: Block;
}

export default class Authorization extends Block<PropsType> {
    router: Router;
    controller: userAPI;
    controllerChats: chatsAPI;

    constructor() {
        super({
            login: new Input(authorizationData.login),
            password: new Input(authorizationData.password),
            btnEnter: new Button(
                {
                    ...authorizationData.button, events: {
                        click: async () => {
                            const formAuth = document.getElementById('form-authorization') as HTMLFormElement;
                            const data = new FormData(formAuth);
                            const result = {
                                login: data.get('login'),
                                password: data.get('password'),
                            }
                            this.controller.signIn(result).then(async () => {
                                const response = await this.controller.getUser();
                                if (response) {
                                    store.set('user', response)
                                    this.router.go('/messenger');
                                }

                                const chatsResponse = await this.controllerChats.getChats();
                                if (chatsResponse) {
                                    const chats = getDataToChats(chatsResponse);
                                    store.set('chats', chats)
                                    store.emit(StoreEvents.UpdatedChats);
                                }
                            });
                        }
                    }
                }
            ),
            link: new Link({
                ...authorizationData.link, events: {
                    click: () => {
                        this.router.go('/registration');
                    },
                }
            }),
        });
        this.router = new Router();
        this.controller = new userAPI();
        this.controllerChats = new chatsAPI();

    }

    render() {
        return this.compile(authorization, this.props);
    }
}
