import { HTTPTransport } from '../../utils/api/api';
import store, { StoreEvents } from "../../utils/store/store";


export class userSettingsAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    async updateProfile(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.put(`${this.baseUrl}/user/profile`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            data,
        });
        return response
    }

    async updatePassword(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.put(`${this.baseUrl}/user/password`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            data,
        });
        store.set('user', response)
        store.emit(StoreEvents.UpdatedUser)
        return response
    }
}
