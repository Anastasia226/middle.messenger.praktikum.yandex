import { HTTPTransport } from '../../utils/api/api';
import { ChatType } from "@/pages/chats/types";

export class chatsAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    async getChats(): Promise<ChatType[]> {
        const response = await this.request.get<ChatType[]>(`${this.baseUrl}/chats`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
        });
        return response

    }

    async createChat(data: any): Promise<XMLHttpRequest> {
        const response = await this.request.post(`${this.baseUrl}/chats`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            data,
        });
        return response
    }

    async getChatToken(id: string): Promise<{ token: string }> {
        const response = await this.request.post(`${this.baseUrl}/chats/token/${id}`, {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
        });
        return JSON.parse((response).response)
    }
}
