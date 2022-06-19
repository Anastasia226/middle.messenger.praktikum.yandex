import { HTTPTransport } from '../../utils/api/api';
import store from "../../utils/store/store";
import { UsersChat } from "@/pages/chats/types";


export class userSettingsAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    async updateProfile(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.put(`${this.baseUrl}/user/profile`, {
            data,
        });
        const user = JSON.parse(response.response);
        store.set('user', user);
        return user;
    }

    async updatePassword(data: any): Promise<XMLHttpRequest> {
        return await this.request.put(`${this.baseUrl}/user/password`, {
            data,
        });
    }

    async updateProfileAvatar(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.put(`${this.baseUrl}/user/profile/avatar`, {
            headers: {},
            data
        });
        const user = JSON.parse(response.response);
        store.set('user', user);
        return user;
    }

    async searchUser(data: any): Promise<UsersChat[]> {
        const response = await this.request.post(`${this.baseUrl}/user/search`, {
            data,
        });
        return JSON.parse(response.response)
    }
}
