import { HTTPTransport } from '../api';
import { ChatType, UsersChat } from "@/pages/chats/types";

export class chatsAPI {
    request: HTTPTransport;
    baseUrl: string;

    constructor() {
        this.request = new HTTPTransport();
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
    }

    async getChats(): Promise<ChatType[]> {
        return await this.request.get<ChatType[]>(`${this.baseUrl}/chats`, {});
    }

    async createChat(data: any): Promise<XMLHttpRequest> {
        return await this.request.post(`${this.baseUrl}/chats`, {

            data,
        });
    }

    async getChatToken(id: number): Promise<{ token: string }> {
        const response = await this.request.post(`${this.baseUrl}/chats/token/${id}`, {});
        return JSON.parse((response).response)
    }

    async getChatUsers(id: any): Promise<UsersChat[]> {
        return await this.request.get<UsersChat[]>(`${this.baseUrl}/chats/${id}/users`, {});
    }

    async addUserToChat(data: any): Promise<XMLHttpRequest> {
        return await this.request.put(`${this.baseUrl}/chats/users`, {
            data,
        });
    }

    async updateChatAvatar(data: FormData): Promise<XMLHttpRequest> {
        return await this.request.put(`${this.baseUrl}/chats/avatar`, {
            headers: {},
            data,
        });
    }
}
