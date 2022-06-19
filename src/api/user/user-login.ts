import { HTTPTransport } from '../../utils/api/api';
import store from "../../utils/store/store";


export class userAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    async signUp(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.post(`${this.baseUrl}/auth/signup`, {

            data,
        });
        return response
    }

    async signIn(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.post(`${this.baseUrl}/auth/signin`, {

            data,
        });
        return response
    }

    async getUser(): Promise<XMLHttpRequest> {
        const response = await this.request.get(`${this.baseUrl}/auth/user`, {});
        store.set('user', response)
        return response
    }

    async logOut(): Promise<XMLHttpRequest> {
        const response = await this.request.post(`${this.baseUrl}/auth/logout`, {});
        return response
    }
}
